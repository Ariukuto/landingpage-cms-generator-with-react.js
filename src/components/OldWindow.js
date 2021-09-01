import React from 'react';
import emitter from "../ev";
import {DynComponent} from './DynComponent';


export class Window extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        show: false,
        close: false,
        showDynComponent: false,
        MsgObject: {
          title: '',
          component: ''
        }
      }
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener("show_window",(MsgObject) => {
      console.log('MsgObject', MsgObject);
      this.setState({MsgObject});
      this.setState({showDynComponent: true});
    });
  }
  
  componentWillUnmount(){
    emitter.removeListener(this.eventEmitter);
  }

  test = () => {
    this.setState({showDynComponent:false})
  }

  // Template
  render() {
    console.log('Window MsgObject', this.state);
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={this.test}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> {this.state.MsgObject.title} </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {this.state.showDynComponent && <DynComponent component={this.state.MsgObject.component} />}
              </div>
            </div>  
          </div>
        </div>
      );
  }
}