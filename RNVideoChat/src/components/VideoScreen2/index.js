import React, { Component } from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import {connect} from 'react-redux';
import ToolBar from './ToolBar';
import CallingLoader from './CallingLoader';

export class VideoScreen2 extends Component {
  render() {

    const { dialog } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar backgroundColor="black" barStyle="light-content" animated />
        
        <CallingLoader />
        <ToolBar dialog={dialog} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoView: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const mapStateToProps = state => {
  // convert map to array
  let dataSource = [];

  Object.keys(state.videosession.videoStreams).map(userId => {
    dataSource.push({
      userId: userId,
      stream: state.videosession.videoStreams[userId],
    });
  });

  return {
    videoStreamsDataSource: dataSource,
  };
};

export default connect(mapStateToProps)(VideoScreen2);
