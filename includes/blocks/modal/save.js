import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'ct-modal modal'
    });

    return (
        <div {...blockProps} id={attributes.id}>
            <button className="btn btn-primary" data-toggle="modal" data-target={`#${attributes.id}`}>
                {attributes.buttonText}
            </button>
            <div className="modal-content">
                <div className="modal-header">
                    <RichText.Content tagName="h5" value={attributes.title} />
                </div>
                <div className="modal-body">
                    <RichText.Content tagName="div" value={attributes.content} />
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}