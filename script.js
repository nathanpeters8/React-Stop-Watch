class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassedInMilliSeconds: 0,
    };

    // timer stored as prop of class object because it needs used in both start and stop methods
    this.timer = null;

    // bind methods to object
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  // calculate elapsed time since user clicks start button
  start() {
    //check if timer does not already exists
    if(!this.timer) {
      // get start time
      let startTime = Date.now();
  
      // interval function that runs every 250ms
      this.timer = setInterval(() => {
        // get elapsed time between stop time and start time
        const stopTime = Date.now();
        const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;
  
        // update the state of elapsed time
        this.setState({timePassedInMilliSeconds});
        
        //reset start time to stop time
        startTime = stopTime;
  
      }, 250);
    }
  }
  
  // stop the timer on stop button click
  stop() {
    // clear interval and set timer to null
    window.clearInterval(this.timer);
    this.timer = null;
  }

  // reset timer on reset button click
  reset() {
    // stop timer
    this.stop();

    // update timer value to 0
    this.setState({
      timePassedInMilliSeconds : 0
    });
  }

  // render the React component in the DOM
  render() {
    return (
      <div>
        <h2 className='border px-3 py-4 rounded my-3 mx-auto text-center' style={{ maxWidth: '300px' }}>
          {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
        </h2>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-primary mr-2' onClick={this.start}>start</button>
          <button className='btn btn-outline-danger mr-2' onClick={this.stop}>stop</button>
          <button className='btn btn-outline-warning' onClick={this.reset}>reset</button>
        </div>
      </div>
    );
  }

}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<StopWatch />);
