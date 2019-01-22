import React from 'react';
import Simditor from 'simditor';
import '../../../../ordersystem/node_modules/simditor/styles/simditor.scss';
//jquery富文本编辑器
class Richeditor extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.loadEditor();
  }
  loadEditor(){
    let element = this.refs['textarea'];
    this.simditor = new Simditor({
      textarea : $(element),
      defaultValue : this.props.placeholder || ' ',
      upload : {
        url : '/manage/product/richtext_img_upload.do',
        defaultImage : '',
        fileKey : "upload_file"
      }
    });
    this.bindEditorEvent();
  }
  bindEditorEvent(){
    this.simditor.on('valuechanged',e =>{
      this.props.onValueChange(this.simditor.getValue());
    })

  }
  render(){
    return(
      <div className = "rich-editor">
      <textarea ref="textarea"></textarea>
       
      </div>
     
    )
    
  }
}

export default Richeditor;
