import React, { Component } from 'react';

class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  render() {
    console.log('user profile page clicked')
    return (
      <div id="userProfile">
        <h3>User Profile Page</h3>
        <p>Farm-to-table prism biodiesel dreamcatcher. Vexillologist vinyl godard offal. Vape flexitarian green juice franzen bitters semiotics, lo-fi vinyl echo park godard pok pok offal meh. Typewriter subway tile meh pickled cronut. Austin coloring book lyft bushwick brunch food truck hashtag lo-fi fanny pack affogato YOLO 90's. Roof party swag palo santo, cold-pressed pabst affogato sartorial intelligentsia freegan biodiesel fanny pack kombucha vexillologist.
        <br/><br/>
        Oh. You need a little dummy text for your mockup? How quaint.
        <br/><br/>
        I bet you’re still using Bootstrap too…</p>
      </div>
    )
  }
}

export default UserProfile;