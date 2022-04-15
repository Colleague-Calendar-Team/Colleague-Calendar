package memcached

import (
	"Backend/config"
	"strconv"
	"time"

	"github.com/bradfitz/gomemcache/memcache"
)

const (
	TokenTTL = time.Hour * 12
)

type Client struct {
	client *memcache.Client
}

// NewMemcached ...
func NewMemcached(configSt config.Memcached) (*Client, error) {
	client := memcache.New(configSt.Endpoint)

	if err := client.Ping(); err != nil {
		return nil, err
	}

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
		return 0, err
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
