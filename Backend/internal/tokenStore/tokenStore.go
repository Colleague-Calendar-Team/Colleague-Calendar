package tokenStore

import (
	"Backend/config"
	"errors"
	"strconv"
	"time"

	"github.com/bradfitz/gomemcache/memcache"
)

var (
	ErrorExpiredToken = errors.New("error expired token")
	ErrorNotFoundToken = errors.New("error token not found")
)

const (
	TokenTTL = time.Hour * 12
)

type Client struct {
	client *memcache.Client
}

// NewMemcached ...
func NewMemcached(configSt *config.TokenStoreConfig) (*Client, error) {
	client := memcache.New(configSt.HTTPServer.Endpoint)

	if err := client.Ping(); err != nil {
		return nil, err
	}

	client.FlushAll() // TODO: maybe cleanse all access only for admin
	client.Timeout = 100 * time.Millisecond
	client.MaxIdleConns = 100

	return &Client{
		client: client,
	}, nil
}

// GetToken ...
func (c *Client) GetToken(token string) (int, error) {
	item, err := c.client.Get(token)
	if err != nil {
		if err.Error() == memcache.ErrNotStored.Error() {
			return 0, ErrorNotFoundToken
		}
		return 0, ErrorExpiredToken
	}
	sID := string(item.Value)
	UserID, err := strconv.Atoi(sID)
	return UserID, err
}

// SetToken ...
func (c *Client) SetToken(token string, UserID int) error {
	return c.client.Set(&memcache.Item{
		Key:        token,
		Value:      []byte(strconv.Itoa(UserID)),
		Expiration: int32(time.Now().Add(TokenTTL).Unix() - time.Now().Unix()),
	})
}
