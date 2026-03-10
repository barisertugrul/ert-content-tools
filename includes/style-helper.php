<?php
trait ERT_Style_Helper {

    protected function resolve_wp_style_value( $value ) {
        if ( ! is_string( $value ) ) {
            return '';
        }

        if ( strpos( $value, 'var:preset|shadow|' ) === 0 ) {
            $slug = str_replace( 'var:preset|shadow|', '', $value );
            return 'var(--wp--preset--shadow--' . esc_attr( $slug ) . ')';
        }

        if ( strpos( $value, 'var:preset|color|' ) === 0 ) {
            $slug = str_replace( 'var:preset|color|', '', $value );
            return 'var(--wp--preset--color--' . esc_attr( $slug ) . ')';
        }

        return esc_attr( $value );
    }

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

        // --- SHADOW ---
        if ( ! empty( $attributes['shadow'] ) && is_string( $attributes['shadow'] ) ) {
            $shadow = $this->resolve_wp_style_value( $attributes['shadow'] );
            if ( ! empty( $shadow ) ) {
                $inline .= 'box-shadow:' . $shadow . ';';
            }
        }

        if ( ! empty( $attributes['style']['shadow'] ) && is_string( $attributes['style']['shadow'] ) ) {
            $shadow = $this->resolve_wp_style_value( $attributes['style']['shadow'] );
            if ( ! empty( $shadow ) ) {
                $inline .= 'box-shadow:' . $shadow . ';';
            }
        }

        return $inline;
    }
}