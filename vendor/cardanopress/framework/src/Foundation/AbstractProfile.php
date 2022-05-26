<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\SharedBase;
use WP_User;

abstract class AbstractProfile extends SharedBase
{
    protected WP_User $user;

    public function __construct(WP_User $user)
    {
        $this->user = $user;

        $this->initialize();
    }

    public function setUserAuth(string $username): void
    {
        wp_set_current_user($this->getData('ID'));
        wp_set_auth_cookie($this->getData('ID'));
        do_action('wp_login', $username, $this->user);
    }

    public function unsetUserAuth(): void
    {
        wp_destroy_current_session();
        wp_clear_auth_cookie();
        wp_set_current_user(0);
        do_action('wp_logout', $this->getData('ID'));
    }

    public function getData(string $key = null)
    {
        if (null === $key) {
            return $this->user;
        }

        return $this->user->$key;
    }

    public function addRole(string $role): void
    {
        $this->user->add_role($role);
    }

    public function removeRole(string $role): void
    {
        $this->user->remove_role($role);
    }

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->getData('roles'), true);
    }

    protected function getMeta(string $key, bool $single = false)
    {
        return get_user_meta($this->getData('ID'), $key, $single);
    }

    protected function addMeta(string $key, $value, bool $unique = false)
    {
        return add_user_meta($this->getData('ID'), $key, $value, $unique);
    }

    protected function updateMeta(string $key, $value, $previous = '')
    {
        return update_user_meta($this->getData('ID'), $key, $value, $previous);
    }
}
