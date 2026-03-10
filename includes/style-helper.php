<?php
trait ERT_Style_Helper {

    protected function build_inline_style( $attributes ) {
        $inline = '';

        // --- COLORS ---
        if (!empty($attributes['backgroundColor'])) {
            $inline .= 'background-color:var(--wp--preset--color--' . esc_attr($attributes['backgroundColor']) . ');';
        }

        if (!empty($attributes['textColor'])) {
            $inline .= 'color:var(--wp--preset--color--' . esc_attr($attributes['textColor']) . ');';
        }

        // --- TYPOGRAPHY ---
        if (!empty($attributes['fontSize'])) {
            $inline .= 'font-size:var(--wp--preset--font-size--' . esc_attr($attributes['fontSize']) . ');';
        }

        if (!empty($attributes['fontFamily'])) {
            $inline .= 'font-family:var(--wp--preset--font-family--' . esc_attr($attributes['fontFamily']) . ');';
        }

        if (!empty($attributes['lineHeight'])) {
            $inline .= 'line-height:' . esc_attr($attributes['lineHeight']) . ';';
        }

        // --- SPACING ---
        if (!empty($attributes['padding'])) {
            $inline .= 'padding:' . esc_attr($attributes['padding']) . ';';
        }

        if (!empty($attributes['margin'])) {
            $inline .= 'margin:' . esc_attr($attributes['margin']) . ';';
        }

        // --- BORDER ---
        if (!empty($attributes['borderRadius'])) {
            $inline .= 'border-radius:' . esc_attr($attributes['borderRadius']) . ';';
        }

        if (!empty($attributes['borderColor'])) {
            $inline .= 'border-color:var(--wp--preset--color--' . esc_attr($attributes['borderColor']) . ');';
        }

        if (!empty($attributes['borderWidth'])) {
            $inline .= 'border-width:' . esc_attr($attributes['borderWidth']) . ';';
        }

        if (!empty($attributes['borderStyle'])) {
            $inline .= 'border-style:' . esc_attr($attributes['borderStyle']) . ';';
        }

        return $inline;
    }
}