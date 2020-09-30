<?php

namespace App\Helpers;

use RuntimeException;
use Dotenv\Dotenv;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Goutte\Client;

use function preg_match_all;
use function strstr;
use function str_replace;

/**
 * Class LinkProcessor
 * @package App\Helpers
 */
class LinkProcessor
{
    /**
     * @param string $body
     * @return string
     */
    public function formatString(string $string): string
    {
        $urls = $this->getUrls($string);
        
        if (!empty($urls)) {
            // Loop through all urls
            foreach ($urls as $url) {
                // Create Search and Replace strings
                $search = $url['url'];
                $replace = '<a href="' . $url['link'] . '" title="' . $url['url'] . '" target="_blank">' . $url['url'] . '</a>';
                $string = str_replace($search, $replace, $string);
            }
        }
        
        return $string;
    }
    
    /**
     * @param string $body
     * @return string
     */
    public function pageScrape(string $string): string
    {
        $returnString = '';
        $pageClient = new Client();
        $urls = $this->getUrls($string);
        
        if (!empty($urls)) {
            foreach ($urls as $url) {
                // Scrape page and get title/content
                $pageCrawler = $pageClient->request('GET', $url['link']);

                $pageTitle = $metaDescription = '';
                try {
                    $pageTitle = $pageCrawler->filter('title')->text();
                }
                catch (Exception $e) {
                }

                try {
                    if ($pageCrawler->filterXpath('//meta[@name="description"]')->count() > 0) {
                        $metaDescription = $pageCrawler->filterXpath('//meta[@name="description"]')->attr('content');
                    }
                }
                catch (Exception $e) {
                }

                // Format content
                if ($pageTitle != '') {
                    $returnString .= '<a href="' . $url['link'] . '" title="' . $pageTitle . '" target="_blank" class="pageScrape">';
                    $returnString .= '<strong>' . $pageTitle . '</strong>';
                    if ($metaDescription != '') {
                        $returnString .= '<br />' . $metaDescription;
                    }
                    $returnString .= '</a>';
                }
            }
        }
        
        return $returnString;
    }
    
    private function getUrls(string $string): array
    {
        $returnURLs = [];
        
        // regex pattern to catch URLs
        $pattern = "/(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))/";
        
        // Check if there is a url in the text
        if (preg_match_all($pattern, $string, $urls)) {
            foreach ($urls[0] as $url) {
                if (strstr($url, ":") === false) {
                    $link = 'http://' . $url;
                } else {
                    $link = $url;
                }
                
                // Replace any uppercase HTTP(S) with lowercase http(s), but only at the start of the string
                $link = preg_replace("/^https:/i", "https:", $link);
                $link = preg_replace("/^http:/i", "http:", $link);
                
                $returnURLs[] = [
                    'url' => $url, 
                    'link' => $link,
                ];
            }
        }
        
        return $returnURLs;
    }
    
}
