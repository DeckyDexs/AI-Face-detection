// --------------------------------------------------------------- FACE MESH PROJECT FOR FACE RECOGNITION ---------------------------------------------------------------


//                                                    *******************************************************************
//                                                                                                                  
//                                                        TO START THE POJECT GO TO THE TERMINAL ADN DIGIT: npm start  
//                                                                                                                  
//                                                    *******************************************************************


// ------------------------------------------------------------------------------- IMPORT -------------------------------------------------------------------------------

//                                           BEFORE IMPORT MEKE SHURE YOU HAVE Node.js INSTALLED OTHERWISE YOU COULDN´T INSTALL REACT

//import logo from './logo.svg';
    import './App.css';
// IMPORT DEPENDECIES
    import React, {useRef} from "react"; // to get references to canvas component
// Even if we don´t use it, it´s helpful becouse it acts as a support for importing models
    import * as tf from '@tensorflow/tfjs';
// Importing models
    import * as facemesh from "@tensorflow-models/facemesh";
// React makes it easy to manage the DOM (Document Object Model hierarchical representation of HTML) and application state, allowing you to focus on application logic rather than implementation details.
    import Webcam from 'react-webcam';
// IMPORT function drawMesh from utilities´ file
    import {drawMesh} from './utilities';







// --------------------------------------------------------------------------- APP CODE HERE ----------------------------------------------------------------------------

function App() {
  // Setup referrences
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


    // Load FaceMesh
    const runFacemesh = async () =>{
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    
    // Detect face each 100ms
    setInterval(()=>{
      detect(net)
    }, 100)
  };


  // Detect Function
  const detect = async (net) =>{

    // to work, it has to be not undefined and it has to receiving data

    if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4)
    { 
      // Get video properties (with webcamRef we take the same style from Webcam becouse of his riferiment)

      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width 
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height  = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height  = videoHeight;

      // Make detections 
      // they are visible on the console
      const face = await net.estimateFaces(video);
      console.log(face);

    //  If the face is detected: 


    if(face.length > 0){
        
        //  1) show the element with class name "risultato" passing from "display: none;" to "display: block;"
        document.querySelector('.risultato').style.display = 'block'
        //  2) hide the element with class name "try" passing from "display: block;" to "display: none;"
        document.querySelector('.try').style.display = 'none'
    }      

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face,ctx);



    }

  };







// -------------------------------------------------------------------------- FRONT END RESULT --------------------------------------------------------------------------


runFacemesh();
return (
  
    <body>

        <header>
            <div className='navbar'>

                <a href="" className='title'><span>D</span>O<span>Y</span>OU<span>H</span>AVE<span>T</span>HE<span>F</span>ACE<span>?</span></a>  
                <div className='link'>
                    <a target="_blank"  href="https://www.bing.com/ck/a?!&&p=2cc23226a4c03db9JmltdHM9MTcxNTIxMjgwMCZpZ3VpZD0zYzIwNGQ5Yi03NGJhLTY5NDktMjY1Ny01OWE5NzViNTY4NDUmaW5zaWQ9NTIxNw&ptn=3&ver=2&hsh=3&fclid=3c204d9b-74ba-6949-2657-59a975b56845&psq=ai+model+wikipedia&u=a1aHR0cHM6Ly9pdC53aWtpcGVkaWEub3JnL3dpa2kvSW50ZWxsaWdlbnphX2FydGlmaWNpYWxl&ntb=1" >Wikipedia</a>
                    <a target="_blank" href="https://www.bing.com/ck/a?!&&p=410027accf5a75c7JmltdHM9MTcxNTIxMjgwMCZpZ3VpZD0zYzIwNGQ5Yi03NGJhLTY5NDktMjY1Ny01OWE5NzViNTY4NDUmaW5zaWQ9NTIxOQ&ptn=3&ver=2&hsh=3&fclid=3c204d9b-74ba-6949-2657-59a975b56845&psq=tensorflow&u=a1aHR0cHM6Ly93d3cudGVuc29yZmxvdy5vcmcv&ntb=1" >TensorFlow</a>
                </div>
            </div>
        </header>

        <main>

            <section className='introduction'>
                <h1>Hy user,</h1>
                <p>
                    we are glad to present you our online AI sistem for face recognition made with TensorFlow's models, based on almost 500 face models. The AI is able to find trough your device's camera your face and show you a triangolation of points and lines to prove that it really works, assuming you have a face. 
                </p>

            </section>

            <section className="App">

                <Webcam id="videoCam" className='mirrored-webcam'
                ref ={webcamRef}/>

                <canvas id="canvasVideo"  className='mirrored-canvas' 
                ref={canvasRef}></canvas>



                <article className='risultato'>
                    <div className='inside-box'>
                        <h1> <span>G</span>ood <span>N</span>ews</h1>
                        <hr></hr>
                        <p>If you are seeing this message, you are a lucky user: in fact our AI sistem has been able to track your face to find out that you have one. Congrats! </p>
                    </div>
                </article>


                <article className='try'>
                    <div className='inside-box'>
                        <h1><span>T</span>RY <span>I</span>T <span>N</span>OW</h1>
                        <hr></hr>
                        <p>Put your head in front of te camera and see the magic</p>
                    </div>
                </article>
                

            </section>

            <footer>

                <a  href="C:\Users\Riccardo\Desktop\TestingThings\FaceMesh" download ><span>DOWNLOAD THE PROJECT</span></a>

            </footer>






        </main>

    </body>

  );
}

export default App;