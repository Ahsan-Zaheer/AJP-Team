import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill-new';
import 'highlight.js/styles/github.css';

const TermsConditionLayer = () => {
    const quillRef = useRef(null);
    const [value, setValue] = useState(`<div id="editor">
  <h2 class="my-3">Terms & Conditions</h2>

  <p>Welcome to the AJ Production Team Portal. These Terms & Conditions ("Terms") govern your access to and use of the portal and its services, including the Task Management and Leave Management systems. By accessing or using the portal, you agree to be bound by these Terms.</p>

  <h6>1. Access & Use</h6>
  <ul>
    <li>The portal is intended solely for authorized AJ Production team members.</li>
    <li>You must not share your login credentials with others.</li>
    <li>Unauthorized access, data tampering, or misuse of the portal may result in disciplinary action or legal consequences.</li>
  </ul>

  <h6>2. User Responsibilities</h6>
  <p>By using the portal, you agree to:</p>
  <ul>
    <li>Use the platform only for work-related activities.</li>
    <li>Keep your account information accurate and up to date.</li>
    <li>Notify the admin immediately if you suspect any unauthorized access to your account.</li>
  </ul>

  <h6>3. Task Management</h6>
  <ul>
    <li>All assigned tasks must be updated regularly to reflect accurate progress.</li>
    <li>Team members are expected to adhere to deadlines and communicate delays proactively.</li>
    <li>Misrepresentation of task status may be reviewed and addressed by management.</li>
  </ul>

  <h6>4. Leave Management</h6>
  <ul>
    <li>Leave requests must be submitted in advance through the portal.</li>
    <li>Approval of leave is subject to your supervisor’s discretion based on workload and availability.</li>
    <li>Falsifying leave reasons or bypassing the approval process is strictly prohibited.</li>
  </ul>

  <h6>5. Privacy & Data Security</h6>
  <ul>
    <li>The portal collects basic user data necessary for task and leave tracking.</li>
    <li>All data is stored securely and used only for internal management purposes.</li>
    <li>AJ Production ensures reasonable measures are taken to protect your data from unauthorized access.</li>
  </ul>

  <h6>6. Modifications & Updates</h6>
  <ul>
    <li>AJ Production reserves the right to modify these Terms at any time.</li>
    <li>Users will be notified of significant changes, and continued use of the portal implies acceptance of updated Terms.</li>
  </ul>

  <h6>7. Termination of Access</h6>
  <ul>
    <li>Access may be suspended or terminated if a user is found violating these Terms.</li>
    <li>Upon exit or resignation, user accounts will be deactivated and data archived.</li>
  </ul>

  <h6>8. Limitation of Liability</h6>
  <p>AJ Production shall not be held liable for any data loss, service interruptions, or performance issues arising from misuse of the portal or technical malfunctions beyond our control.</p>

  <h6>9. Contact</h6>
  <p>For any questions or concerns regarding these Terms & Conditions, please contact:</p>
  <ul>
    <li>📧 admin@ajproduction.com</li>
    <li>📞 [Insert contact number]</li>
  </ul>
</div>`);

    // eslint-disable-next-line no-unused-vars
    const [isHighlightReady, setIsHighlightReady] = useState(false);

    useEffect(() => {
        // Load highlight.js configuration and signal when ready
        hljs?.configure({
            languages: ['javascript', 'ruby', 'python', 'java', 'csharp', 'cpp', 'go', 'php', 'swift'],
        });



    }, []);

    const handleSave = () => {
        const editorContent = quillRef.current.getEditor().root.innerHTML;
        console.log("Editor content:", editorContent);
    };

    // Quill editor modules with syntax highlighting (only load if highlight.js is ready)
    const modules = isHighlightReady
        ? {
            syntax: {
                highlight: (text) => hljs?.highlightAuto(text).value,  // Enable highlight.js in Quill
            },
            toolbar: {
                container: '#toolbar-container',  // Custom toolbar container
            },
        }
        : {
            toolbar: {
                container: '#toolbar-container',  // Custom toolbar container
            },
        };

    const formats = [
        'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
        'script', 'header', 'blockquote', 'code-block', 'list', 'indent',
        'direction', 'align', 'link', 'image', 'video', 'formula',
    ];

    return (
        <>
            <div className="card basic-data-table radius-12 overflow-hidden">
                <div className="card-body p-0">
                    {/* Editor Toolbar */}
                    <div id="toolbar-container">
                        <span className="ql-formats">
                            <select className="ql-font"></select>
                            <select className="ql-size"></select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-bold"></button>
                            <button className="ql-italic"></button>
                            <button className="ql-underline"></button>
                            <button className="ql-strike"></button>
                        </span>
                        <span className="ql-formats">
                            <select className="ql-color"></select>
                            <select className="ql-background"></select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-script" value="sub"></button>
                            <button className="ql-script" value="super"></button>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-header" value="1"></button>
                            <button className="ql-header" value="2"></button>
                            <button className="ql-blockquote"></button>
                            <button className="ql-code-block"></button>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-list" value="ordered"></button>
                            <button className="ql-list" value="bullet"></button>
                            <button className="ql-indent" value="-1"></button>
                            <button className="ql-indent" value="+1"></button>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-direction" value="rtl"></button>
                            <select className="ql-align"></select>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-link"></button>
                            <button className="ql-image"></button>
                            <button className="ql-video"></button>
                            <button className="ql-formula"></button>
                        </span>
                        <span className="ql-formats">
                            <button className="ql-clean"></button>
                        </span>
                    </div>

                    {/* Quill Editor */}
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        formats={formats}
                        placeholder="Compose an epic..."
                    />
                </div>

                <div className="card-footer p-24 bg-base border border-bottom-0 border-end-0 border-start-0">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary border border-primary-600 text-md px-28 py-12 radius-8"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditionLayer;
