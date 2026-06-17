<?php

namespace Tests\Integration;

use PHPUnit\Framework\TestCase;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Compatibility;
use CardanoPress\Dependencies\Psr\Log\NullLogger;
use ThemePlate\Tester\Utils;
use Tests\LoadDependencies;

class CompatibilityTest extends TestCase
{
    use LoadDependencies;

    private Compatibility $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        if (! defined('CARDANOPRESS_FILE')) {
            define('CARDANOPRESS_FILE', dirname(__DIR__, 2) . '/cardanopress.php');
        }

        new Application(CARDANOPRESS_FILE);
        $this->subject = new Compatibility(new NullLogger());
        $this->subject->load();
    }

    protected function tearDown(): void
    {
        remove_theme_support('html5');
        remove_all_filters('cardanopress_is_block_theme');
        delete_option('cardanopress_status');
        delete_option('cardanopress_issues');
        parent::tearDown();
    }



    public function test_html5_true_with_script_in_support(): void
    {
        add_theme_support('html5', ['script']);

        $this->assertTrue($this->subject->html5());
    }

    public function test_html5_false_when_no_support_declared(): void
    {
        $this->assertFalse($this->subject->html5());
    }

    public function test_html5_false_when_script_absent_from_support(): void
    {
        add_theme_support('html5', ['gallery', 'caption']);

        $this->assertFalse($this->subject->html5());
    }

    public function test_theme_true_for_block_theme(): void
    {
        add_filter('cardanopress_is_block_theme', '__return_true');

        $this->assertTrue(Utils::invoke_inaccessible_method($this->subject, 'theme'));
    }

    public function test_theme_true_when_loopback_succeeds(): void
    {
        $cb = static fn () => ['body' => '', 'response' => ['code' => 200]];
        add_filter('pre_http_request', $cb, 10, 3);
        $result = Utils::invoke_inaccessible_method($this->subject, 'theme');
        remove_filter('pre_http_request', $cb, 10);

        $this->assertTrue($result);
    }

    public function test_theme_false_when_loopback_fails(): void
    {
        $cb = static fn () => new \WP_Error('loopback', 'blocked');
        add_filter('pre_http_request', $cb, 10, 3);
        $result = Utils::invoke_inaccessible_method($this->subject, 'theme');
        remove_filter('pre_http_request', $cb, 10);

        $this->assertFalse($result);
    }

    public function test_run_sets_activated_when_theme_fails(): void
    {
        $cb = static fn () => new \WP_Error('loopback', 'blocked');
        add_filter('pre_http_request', $cb, 10, 3);
        $this->subject->run();
        remove_filter('pre_http_request', $cb, 10);

        $this->assertSame('activated', $this->subject->getStatus());
    }

    public function test_run_proceeds_past_theme_when_succeeds(): void
    {
        $cb = static fn () => ['body' => '', 'response' => ['code' => 200]];
        add_filter('pre_http_request', $cb, 10, 3);
        $this->subject->run();
        remove_filter('pre_http_request', $cb, 10);

        $this->assertNotSame('activated', $this->subject->getStatus());
    }

    public function test_run_adds_sodium_issue_when_unavailable(): void
    {
        if (function_exists('sodium_crypto_box')) {
            $this->markTestSkipped('sodium is present in this environment');
        }

        $cb = static fn () => ['body' => '', 'response' => ['code' => 200]];
        add_filter('pre_http_request', $cb, 10, 3);
        $this->subject->run();
        remove_filter('pre_http_request', $cb, 10);

        $this->assertTrue($this->subject->hasIssue('sodium'));
    }

    public function test_run_no_sodium_issue_when_present(): void
    {
        if (! function_exists('sodium_crypto_box')) {
            $this->markTestSkipped('sodium is not present in this environment');
        }

        $cb = static fn () => ['body' => '', 'response' => ['code' => 200]];
        add_filter('pre_http_request', $cb, 10, 3);
        $this->subject->run();
        remove_filter('pre_http_request', $cb, 10);

        $this->assertFalse($this->subject->hasIssue('sodium'));
    }

    public function test_add_issue_returns_true_for_valid_type(): void
    {
        $this->assertTrue($this->subject->addIssue('html5'));
    }

    public function test_add_issue_returns_false_for_invalid_type(): void
    {
        $this->assertFalse($this->subject->addIssue('nonexistent'));
    }

    public function test_has_issue_true_after_add(): void
    {
        $this->subject->addIssue('html5');

        $this->assertTrue($this->subject->hasIssue('html5'));
    }

    public function test_has_issue_false_before_add(): void
    {
        $this->assertFalse($this->subject->hasIssue('html5'));
    }

    public function test_has_issue_false_for_invalid_type(): void
    {
        $this->assertFalse($this->subject->hasIssue('nonexistent'));
    }

    public function test_get_issues_from_memory_deduplicates(): void
    {
        $this->subject->addIssue('html5');
        $this->subject->addIssue('html5');

        $this->assertSame(['html5'], $this->subject->getIssues());
    }

    public function test_get_issues_from_cache_reads_option(): void
    {
        update_option('cardanopress_issues', ['sodium'], false);

        $this->assertSame(['sodium'], $this->subject->getIssues(true));
    }

    public function test_save_issues_persists_to_option(): void
    {
        $this->subject->addIssue('html5');
        $this->subject->saveIssues();

        $this->assertSame(['html5'], get_option('cardanopress_issues', []));
    }

    public function test_save_issues_sets_issue_status_when_not_empty(): void
    {
        $this->subject->addIssue('sodium');
        $this->subject->saveIssues();

        $this->assertSame('issue', $this->subject->getStatus());
    }

    public function test_save_issues_sets_normal_status_when_empty(): void
    {
        $this->subject->saveIssues();

        $this->assertSame('normal', $this->subject->getStatus());
    }

    public function test_save_issues_reset_clears_issues(): void
    {
        $this->subject->addIssue('html5');
        $this->subject->saveIssues(true);

        $this->assertFalse($this->subject->hasIssue('html5'));
        $this->assertSame([], get_option('cardanopress_issues', null));
    }
}
