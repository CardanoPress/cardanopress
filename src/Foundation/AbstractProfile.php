<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Foundation;

use WP_User;

abstract class AbstractProfile
{
    protected WP_User $user;

    public function __construct(WP_User $user)
    {
        $this->user = $user;
    }

    public function setUserAuth(string $username): void
    {
        wp_set_current_user($this->user->ID);
        wp_set_auth_cookie($this->user->ID);
        do_action('wp_login', $username, $this->user);
    }

    public function unsetUserAuth(): void
    {
        wp_destroy_current_session();
        wp_clear_auth_cookie();
        wp_set_current_user(0);
        do_action('wp_logout', $this->user->ID);
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

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->user->roles, true);
    }
}
