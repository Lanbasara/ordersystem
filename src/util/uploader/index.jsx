import FileUpload  from './FileUploader.jsx';
import React from 'react';
class FileUploader extends React.Component{
  render(){
    /*set properties*/
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName : 'upload_file',
      dataType : 'json',
      chooseAndUpload : true,
      uploadSuccess : (res)=>{this.props.onSucess(res.data)},
      uploadError : (err)=>{this.props.onFail(err.message||'Opps!')}
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <FileUpload options={options}>
        <button className='btn btn-xs btn-default' ref="chooseAndUpload">choose image</button>
      </FileUpload>
    )	        
  }

}

export default FileUploader;
