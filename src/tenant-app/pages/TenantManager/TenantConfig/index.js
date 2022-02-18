import React, { Component } from 'react'
import { Divider } from 'primereact/divider';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';



class TenantConfig extends Component{

    constructor(props) {
        super(props);

        this.state = {
            totalSize: 0
        };

        this.onUpload = this.onUpload.bind(this);
        this.onTemplateUpload = this.onTemplateUpload.bind(this)
        this.onTemplateSelect = this.onTemplateSelect.bind(this);
        this.onTemplateRemove = this.onTemplateRemove.bind(this);
        this.onTemplateClear = this.onTemplateClear.bind(this);
        this.headerTemplate = this.headerTemplate.bind(this);
        this.itemTemplate = this.itemTemplate.bind(this);
        this.emptyTemplate = this.emptyTemplate.bind(this);
    }

    onUpload() {
        this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    onTemplateSelect(e) {
        let totalSize = this.state.totalSize;
        e.files.forEach(file => {
            totalSize += file.size;
        });

        this.setState({
            totalSize
        });
    }
    emptyTemplate() {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="p-my-5">&nbsp;Drag and Drop Image Here</span>
            </div>
        )
    }
    onTemplateUpload(e) {
        let totalSize = 0;
        e.files.forEach(file => {
            totalSize += (file.size || 0);
        });

        this.setState({
            totalSize
        }, () => {
            this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
        });
    }

    onTemplateRemove(file, callback) {
        this.setState((prevState) => ({
            totalSize: prevState.totalSize - file.size
        }), callback);
    }

    onTemplateClear() {
        this.setState({ totalSize: 0 });
    }


    itemTemplate(file, props) {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => this.onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }
    headerTemplate(options) {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = this.state.totalSize/10000;
        const formatedValue = this.fileUploadRef ? this.fileUploadRef.formatSize(this.state.totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton }
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }
    render(){
        const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
        const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
        const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

        return(
            <div>
            <h2 className="p-mb-3 p-text-bold" style={{marginLeft:"20px", color: "#495057"}}>Tenant Configuration</h2>
            {/* <Divider style={{ "width":"82vw"}} /> */}

            <div className="accordion-demo" style={{width:"82vw"}}>
            <Accordion activeIndex={0}>
            <AccordionTab header={<React.Fragment><i className="pi pi-image"></i> &nbsp;<span>Change Company Logo</span></React.Fragment>}>                           
            <FileUpload ref={(el) => this.fileUploadRef = el} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={1000000}
                        onUpload={this.onTemplateUpload} onSelect={this.onTemplateSelect} onError={this.onTemplateClear} onClear={this.onTemplateClear}
                        headerTemplate={this.headerTemplate} itemTemplate={this.itemTemplate} emptyTemplate={this.emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />




                        </AccordionTab>
                        <AccordionTab header={<React.Fragment><i className="pi pi-image"></i> &nbsp;<span>Change Background Image</span></React.Fragment>}>                           
                        <FileUpload ref={(el) => this.fileUploadRef = el} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={1000000}
                        onUpload={this.onTemplateUpload} onSelect={this.onTemplateSelect} onError={this.onTemplateClear} onClear={this.onTemplateClear}
                        headerTemplate={this.headerTemplate} itemTemplate={this.itemTemplate} emptyTemplate={this.emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />

                        </AccordionTab>
                 
                    </Accordion>

            </div>


















            </div>
        )
    }
}

export default TenantConfig