import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { items } = attributes;

    const blockProps = useBlockProps({
        className: `ct-accordion accordion ${attributes.className || ''}`
    });

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const addItem = () => {
        const newItems = [...items, { title: '', content: '' }];
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Accordion Settings', 'ert-content-tools')}>
                    {/* Here you can add custom settings for the accordion block */}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {items.map((item, index) => {
                    const panelId = `acc-editor-${index}`;

                    return (
                    <div key={index} className="accordion-item" style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>{__('Accordion Item', 'ert-content-tools')} {index + 1}</span>
                            <Button
                                onClick={() => removeItem(index)}
                                isDestructive
                                isSmall
                            >
                                {__('Remove', 'ert-content-tools')}
                            </Button>
                        </div>
                        <RichText
                            tagName="div"
                            className="accordion-header"
                            role="button"
                            tabIndex={0}
                            aria-controls={panelId}
                            aria-expanded="false"
                            data-toggle="collapse"
                            data-target={`#${panelId}`}
                            value={item.title}
                            onChange={(val) => updateItem(index, 'title', val)}
                            placeholder={__('Accordion title...', 'ert-content-tools')}
                            style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}
                        />
                        <RichText
                            tagName="div"
                            id={panelId}
                            className="accordion-body"
                            aria-hidden="true"
                            value={item.content}
                            onChange={(val) => updateItem(index, 'content', val)}
                            placeholder={__('Accordion content...', 'ert-content-tools')}
                            style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px', minHeight: '60px' }}
                        />
                    </div>
                );
                })}
                <Button
                    onClick={addItem}
                    isPrimary
                    style={{ marginTop: '10px' }}
                >
                    {__('Add Accordion Item', 'ert-content-tools')}
                </Button>
            </div>
        </>
    );
}
