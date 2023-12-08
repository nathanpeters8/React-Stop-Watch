const { useState, useEffect, useRef } = React;

const StopWatch = () => {
  
  const [timePassed, setTimePassed] = useState(0);

  // make timer a ref with initial state of null
  const timer = useRef(null);
  
  // calculate elapsed time since user clicks start button
  const start = () => {
    // use .current to access the timer vallue
    if(!timer.current) {
      // get start time
      let startTime = Date.now();
  
      // interval function that runs every 250ms
      timer.current = setInterval(() => {
        // get elapsed time between stop time and start time
        console.log('timePassed:', timePassed);
        const stopTime = Date.now();
  
        // use callback in setState to get latest state value
        setTimePassed(timePassed => stopTime - startTime + timePassed);
        
        //reset start time to stop time
        startTime = stopTime;
  
      }, 1000);
    }
  }
  
  // stop the timer on stop button click
  const stop = ()  => {
    console.log('stop', timer.current);
    // clear interval and set timer to null
    window.clearInterval(timer.current);
    timer.current = null;
  }

  // reset timer on reset button click
  const reset = () => {
    stop();
    setTimePassed(0);
  }

  // render the React component in the DOM
  return (
    <div>
      <h2 className='border px-3 py-4 rounded my-3 mx-auto text-center' style={{ maxWidth: '300px' }}>
        {Math.floor(timePassed / 1000)} s
      </h2>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-primary mr-2' onClick={start}>start</button>
        <button className='btn btn-outline-danger mr-2' onClick={stop}>stop</button>
        <button className='btn btn-outline-warning' onClick={reset}>reset</button>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<StopWatch />);
