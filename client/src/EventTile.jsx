import React, { Component } from 'react';


class EventTile extends Component {
  constructor () {
    super();
    
  }

  render () {
    return (
      <div>
        <div className="col s12">
          <div className="card card-panel hoverable sticky-action">
            <div className="card-image">
              <img className="activator" src="https://www.banfflakelouise.com/sites/default/files/moraine-lake-photographer-banff-alberta_0.jpeg"/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
              <a href="#">This is a link</a>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>

        {/* <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="images/office.jpg"/>
          </div>
          <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
          <p><a href="#">This is a link</a></p>
          </div>
          <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div> */}

      </div>
    )
  }
}

export default EventTile;

