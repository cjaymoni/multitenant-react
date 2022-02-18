import React, { Component, Fragment } from 'react';
import { Formik, Field ,Form} from 'formik';
import './formstyle.css';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from 'primereact/inputtextarea';
import Select from 'react-select'
import {Calendar} from 'primereact/calendar'
import {Dropdown} from 'primereact/dropdown'
import {InputNumber} from 'primereact/inputnumber'
import { Button } from 'primereact/button';
class DynamicForm extends Component {
    
  renderCheckBox(input){
    const CustomInputComponent = ({
      field, 
      form: { touched, errors }, 
      ...props
      }) => (
      <div>
       <Checkbox {...field} {...props} 
                        name={input.name}
                        inputId="binary"
                         checked={field.value} 
                         onChange={field.onChange} 
                         style={{width:'20vw',marginRight:'100px'}}
                         tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}
                         />
        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
      );
      return (
        <div>
        <Fragment key={input.name}>
           <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
      <Field name={input.name} component={CustomInputComponent} placeholder="First Name"/>
      </Fragment>
      </div>
      )
  
  }
  // renderCheckBox(input) {
  //   return (
  //     <Fragment key={input.name}>
  //       <label htmlFor={input.label}>{input.label}</label>
  //       <Field
  //         name={input.name}
  //         render={(prop) => {
  //           const { field } = prop;
  //           return (
         
  //                   <div className="p-field-checkbox p-field">
  //                       <Checkbox 
  //                       name={input.name}
  //                       inputId="binary"
  //                        checked={field.value} 
  //                        onChange={field.onChange} 
  //                        />
  //             </div>
          
         
  //           );
  //         }}
  //       />
  //     </Fragment>

  //   );
  // }

  renderTextArea(input) {
    return (
      <div>
      <Fragment key={input.name}>
        <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
        <div>
        <Field name={input.name}>
        {({ field, form, meta }) => (
     <div >        
     <InputTextarea style={{width:'380px', marginRight:'100px'}}  type="text" {...field} placeholder={input.label}
      tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}/>
          {meta.touched &&
         meta.error && <div className="error">{meta.error}</div>}
        </div>
      )}
    </Field>
        </div>
      </Fragment>
      </div>
      );
     }
  
  
monthNavigatorTemplate(e) {
  return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-mr-2" style={{ lineHeight: 1 }} />;
}

yearNavigatorTemplate(e) {
  return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{  lineHeight: 1 }} />;
}

  renderCalendar(input){
    return(
      <div>
      <Fragment key={input.name}>
        <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
        <div>
        <Field name={input.name}>
        {({ field, form, meta }) => (
     <div >        
      <Calendar 
         {...field} 
         style={{width:'380px', marginRight:'100px'}}
         name = {input.name}
          placeholder={input.label}
          value={field.value}
          onChange={(event) => field.onChange(event)}
          monthNavigator
          yearNavigator
          yearRange="2010:2050"
          monthNavigatorTemplate={this.monthNavigatorTemplate}
          yearNavigatorTemplate={this.yearNavigatorTemplate}
          showIcon 
          className="calClass"
          tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}
         />
          {meta.touched &&
         meta.error && <div className="error">{meta.error}</div>}
        </div>
      )}
    </Field>
        </div>
      </Fragment>
      </div>  
    )

  }

  renderNumber(input){
    return (
      <div>
      <Fragment key={input.name}>
        <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
        <div>
        <Field name={input.name}>
        {({ field, form, meta }) => (
     <div >        
     <InputNumber  
     name = {input.name} 
     className="calClass"
     onValueChange={(event) => field.onChange(event)}
 inputId="stacked" value={field.value} style={{width:'380px', marginRight:'100px',}}
    // onValueChange={(e) => this.setState({value17: e.value})} 
    showButtons 
    tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}} />
      {meta.touched &&
        meta.error && <div className="error">{meta.error}</div>}
    </div>
      )}
    </Field>
        </div>
      </Fragment>
      </div>
      );
    
  }

  renderPrice(input){
    return (
      <div>
      <Fragment key={input.name}>
        <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
        <div>
        <Field name={input.name}>
        {({ field, form, meta }) => (
     <div >        
     <InputNumber  
     name = {input.name} 
     className="calClass"
     onValueChange={(event) => field.onChange(event)}
 inputId="stacked" value={field.value} style={{width:'380px', marginRight:'100px',}}
    // onValueChange={(e) => this.setState({value17: e.value})} 
    showButtons mode="currency" currency="GHS"
    tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}} />
      {meta.touched &&
        meta.error && <div className="error">{meta.error}</div>}
    </div>
      )}
    </Field>
        </div>
      </Fragment>
      </div>
      );
    
  }
  renderSelect(input){
    const options = input.data
    return(
      <div>
      <Fragment key={input.name}>
        <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
        <div>
        <Field name={input.name}>
        {({ field, form, meta }) => (
      <div   style={{width:'380px', marginRight:'100px'}}>
      <Select
       {...field}
      value={field.value}  
     options={options}
     onChange={selectedOption => {
       let event = { target : { name:input.name,value: selectedOption}}
       field.onChange(event)
     }}
      isClearable
      tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}
      placeholder='Select option'></Select>
          {meta.touched &&
         meta.error && <div className="error">{meta.error}</div>}
        </div>
      )}
    </Field>
        </div>
      </Fragment>
      </div>  
    )

  }

  renderLook(input){
    const options = input.data
    const CustomInputComponent = ({
      field, 
      form: { touched, errors }, 
      ...props
      }) => (
      <div   style={{width:'380px', marginRight:'100px'}}>
      <Select
    
       value={field.value} {...field} {...props} 
        options={options}
        onChange={selectedOption => {
          let event = { target : { name:input.name,value: selectedOption}}
          field.onChange(event)
      }}
      isClearable
      tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}
        placeholder='Select option'></Select>
        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
      );
      return (
        <div >        
        <Fragment key={input.name}>
           <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
      <Field name={input.name} component={CustomInputComponent} >
    
          </Field>
      </Fragment>
      </div>
      )
  
  }
   



  renderFields(inputs) {
    return inputs.map(input => {
      if(input.type === 'select') {
        return this.renderSelect(input);
      }

      if(input.type === 'checkbox') {
        return this.renderCheckBox(input);
      }

      if(input.type === 'textarea') {
        return this.renderTextArea(input);
      }
      
      if(input.type === 'date') {
        return this.renderCalendar(input);
      }
      if(input.type === 'number') {
        return this.renderNumber(input);
      }
      if(input.type === 'price') {
        return this.renderPrice(input);
      }
      return (
        <div  key={input.name} >        

          <label style={{marginTop:'20px',fontWeight:'bold'}}>{input.label}</label>
          <div className="p-field p-col">
                      <Field name={input.name}>
          {({ field, form, meta }) => (
           <div >
        <InputText type="text" {...field} placeholder={input.label} style={{width:'380px', marginRight:'100px'}}  
        tooltip={input.tooltip} tooltipOptions={{position: 'bottom'}}/><br></br>
        {meta.touched &&
        meta.error && <div className="error">{meta.error}</div>}
        </div>
        )}
      </Field>
          
          </div>
        </div>
      );
    })
  }

  getInitialValues(inputs) {
    //declare an empty initialValues object
    const initialValues = {};
    //loop loop over fields array
    //if prop does not exit in the initialValues object,
    // pluck off the name and value props and add it to the initialValues object;
    inputs.forEach(field => {
      if(!initialValues[field.name]) {
        initialValues[field.name] = field.value;
      }
    });

    //return initialValues object
    return initialValues;
  }
  // handleSubmit(){
  //   console.log()
  // }

  render() {
    const initialValues = this.getInitialValues(this.props.fields);

    return (

<div 
// className=" align-items-center justify-content-center" 
 >
            {/* <Formik validationSchema={this.props.validation} 
             validateOnChange={true}
              initialValues={initialValues}
              onSubmit={(values) => {console.log(values,'hey')}}
       >
       {props =>{
      
      const{ handleChange, values, errors} = props;
      return(
           <>
              
           <Form id="assetform" style={{width:'80vw'}} onSubmit={(values) => {console.log(values,'hey')}}>


           {this.renderFields(this.props.fields)}
           <br></br>
           <br></br>
           <div style={{width:'73vw',alignItems:'center',justifyContent:"center",display:'flex', marginTop:'-2em'}}>
    <Button type='submit' icon="pi pi-plus" label='Add New Asset' style={{width:'300px',fontSize:'20px'}}></Button>

    </div>

           </Form>
          
            </>
            )
          }}
          </Formik> */}





        <Formik
          onSubmit={(values) => {console.log(values)}}
          validationSchema={this.props.validation}
          initialValues={initialValues}
          render={(form) => {
            const errorMessageShow = Object.keys(form.errors).length > 0 ? 'error' : 'hidden';
            return <div className="p-formgroup-inline">
              <form onSubmit={form.handleSubmit}>
                {/* <div className={errorMessageShow}>
                  Please correct the errors below
                </div> */}
              
                {this.renderFields(this.props.fields)}
              
                <button type='submit' className='btn'>Submit</button>
              </form>
            </div>
          }}
        />
      </div>
    );
  }
}


export default DynamicForm;