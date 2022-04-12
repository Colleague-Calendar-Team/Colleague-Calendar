package tokenStore

import (
	"Backend/config"
	"errors"
	"strconv"
	"time"

	"github.com/bradfitz/gomemcache/memcache"
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

	client.FlushAll() // TODO: maybe delete cleanse
	client.Timeout = 100 * time.Millisecond
	client.MaxIdleConns = 100

	return &Client{
		client: client,
	}, nil
}

// GetToken ...
func (c *Client) GetToken(token string) (int, error) {
	item, err := c.client.Get(token)
	if err != nil || item.Expiration > 0 {
		return 0, errors.New("xxx")
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
		Expiration: int32(time.Now().Add(1*time.Minute).Unix() - time.Now().Unix()),
	})
}
