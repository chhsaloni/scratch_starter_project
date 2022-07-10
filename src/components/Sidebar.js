// import React from "react";
// import Icon from "./Icon";

// export default function Sidebar() {
//   return (
//     <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
//       <div className="font-bold"> {"Events"} </div>
//       <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
//         {"When "}
//         <Icon name="flag" size={15} className="text-green-600 mx-2" />
//         {"clicked"}
//       </div>
//       <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
//         {"When this sprite clicked"}
//       </div>
//       <div className="font-bold"> {"Motion"} </div>
//       <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
//         {"Move 10 steps"}
//       </div>
//       <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
//         {"Turn "}
//         <Icon name="undo" size={15} className="text-white mx-2" />
//         {"15 degrees"}
//       </div>
//       <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
//         {"Turn "}
//         <Icon name="redo" size={15} className="text-white mx-2" />
//         {"15 degrees"}
//       </div>
//     </div>
//   );
// }
import React,{useRef,useState} from "react";
import Icon from "./Icon";
import '../app.css'
import TextArea from "./other comp/textArea"
import Select from "./other comp/select"
import Radio from "./other comp/radio"
import MidArea from "./MidArea"
import CatSprite from './CatSprite'
import Draggable from "react-draggable";


export default function Sidebar() {

  const onDragStart = (event,id) =>{
    event.dataTransfer.setData('text', id);
  };
  const onDragOver = (ev)=>{
    ev.preventDefault();
  }
  const onDrop = (ev,id1)=>{
    var id = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(id))
    var targetarea = document.getElementById(id1)
    targetarea.style.width = "fit-content"
  }

  

    const motionRef = useRef(null)
    const looksRef = useRef(null)
    const eventref = useRef(null)
    const controllref = useRef(null)

    const executeScrollmotion = () => motionRef.current.scrollIntoView()  
    const execlookRef = () => looksRef.current.scrollIntoView() 
    const execevent =()=> eventref.current.scrollIntoView()
    const execControl = ()=> controllref.current.scrollIntoView()

    const [xpos, setxpos] = useState(15)
    const [ypos, setypos] = useState(0)
    const [val,getVal] = useState(0)
    const [valy,getvaly] = useState(0)
    const [deg, setdeg] = useState(0)
    const [transform,setTransform] = useState(0)
    const [time, getTime] = useState(0)

    const handlerotation = ()=>{
      setdeg(deg=>deg+transform)
    }

    const pointtowards=()=>{
      setdeg(Math.floor(Math.random()*360+1))
      console.log(deg)
    }

    const handleIncrement = () => {
      alert(xpos)
     setxpos(xpos=>xpos+val)
     setypos(ypos=>ypos+valy)
    }

    const torandom=()=>{
      setxpos(Math.floor(Math.random() * 200) + 1)
      setypos(Math.floor(Math.random() * 200) + 1)
    }

    var dirRotation = "rotate("+deg.toString()+")"

  return (
    <div className="overflow-hidden flex flex-row">
      <div className="space-y-8 border-r-2 cursor-pointer flex flex-col justify-items-center">
        <button onClick={executeScrollmotion}>
          <div style={{margin:"5px auto"}} className="rounded-full h-5 w-5 mx-2 flex bg-blue-500"></div>
          <p style={{fontSize:"16px",textAlign:"center"}}>{"Motion"}</p>
        </button>
        <button onClick={execlookRef}>
          <div style={{margin:"2px auto"}} className="rounded-full h-5 w-5 mx-2 flex bg-purple-500"></div>
          <p style={{fontSize:"16px",textAlign:"center"}}>{"Looks"}</p>
        </button>
        <button onClick={execevent}>
          <div style={{margin:"2px auto"}} className="rounded-full h-5 w-5 mx-2 flex bg-yellow-300"></div>
          <p style={{fontSize:"16px",textAlign:"center"}}>{"Events"}</p>
        </button>
        <button onClick={execControl}>
          <div style={{margin:"2px auto"}} className="rounded-full h-5 w-5 mx-2 flex bg-yellow-500"></div>
          <p style={{fontSize:"16px",textAlign:"center"}}>{"Control"}</p>
        </button>
      </div>



      <div className="flex-none overflow-y-auto flex flex-col items-start p-1 border-r border-gray-200">
        <div ref={motionRef}  className="font-bold" style={{fontFamily:"Helvetica Nueu, Helvetica, san-serif",fontSize:"14pt",fontWeight:"bold",fill:"#575E75"}}> {"Motion"} </div>
        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable1" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          <button style={{outline:"none"}}>Move<TextArea change={ev=>getVal(parseInt(ev.target.value))} id="movetox" place={10}/>steps</button>
        </div>


        <div onClick={handlerotation} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable2" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"Turn "}<span style={{margin:"auto 0"}}><Icon name="undo" size={12} className="text-white mx-2"/></span><TextArea change={ev=>setTransform(parseInt(-(ev.target.value)))} place={15}/>{"Degrees"}
        </div>


        <div onClick={handlerotation} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable3" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"Turn "}<span style={{margin:"auto 0"}}><Icon name="redo" size={12} className="text-white mx-2" /></span><TextArea change={ev=>setTransform(parseInt(ev.target.value))} place={15}/>{"degrees"}
        </div>


        <div onClick={torandom} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable4" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"go to"}<Select type={"motion1"} className={"bg-blue-600"}/>
        </div>


        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable5" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"go to x: "}<TextArea change={ev=>getVal(parseInt(ev.target.value))} place={0}/>{"y:"}<TextArea change={ev=>getvaly(parseInt(ev.target.value))} place={0}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable6" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"glide"}<TextArea change={ev=>getTime(parseInt(ev.target.value))} place={1}/>{"secs to:"}<Select type={"motion1"} className={"bg-blue-600"}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable7" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"glide"}<TextArea place={1}/>{"secs to x:"}<TextArea place={0}/>{"y:"}<TextArea place={0}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable8" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"point in direction"}<TextArea place={180}/>
        </div>


        <div onClick={pointtowards} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable9" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"point towards"}<Select type={"motion1"} className={"bg-blue-600"}/>
        </div>


        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable10" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"change x by"}<TextArea change={ev=>getVal(parseInt(ev.target.value))} place={10}/>
        </div>


        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable11" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"set x to"}<TextArea change={ev=>getVal(parseInt(ev.target.value))} place={-214}/>
        </div>


        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable12" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"change y by"}<TextArea change={ev=>getvaly(parseInt(ev.target.value))}  place={10}/>
        </div>


        <div onClick={handleIncrement} draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable13" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"set y to"}<TextArea change={ev=>getvaly(parseInt(ev.target.value))} place={167}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable14" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"If on edge, bounce"}
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable15" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
          {"set rotation style"}<Select type={"motion2"} className={"bg-blue-600"}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable16" className="flex flex-col flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
          <Radio className={"bg-blue-500"} text={"x position"}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable17" className="flex flex-col flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
          <Radio className={"bg-blue-500"} text={"y-position"}/>
        </div>


        <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable18" className="flex flex-col flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
          <Radio className={"bg-blue-500"} text={"direction"}/>
        </div>





      <div ref={looksRef} id="looks" className="font-bold" style={{fontFamily:"Helvetica Nueu, Helvetica, san-serif",fontSize:"14pt",fontWeight:"bold",fill:"#575E75"}}> {"Looks"} </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable19" className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"say"}<TextArea place={"Hello"}/>{"for"}<TextArea/>{"seconds"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable20" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"say"}<TextArea place={"Hello"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable21" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"say"}<TextArea place={"Hello"}/>{"for"}<TextArea/>{"seconds"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable22" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"Think"}<TextArea place={"Hmm.."}/>{"for"}<TextArea/>{"seconds"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable23" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"Think"}<TextArea place={"Hmm.."}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable24" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"switch costume to"}<Select type={"looks1"} className={"bg-purple-700"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable25" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"next costume"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable26" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"switch backdrop to"}<Select type={"looks2"} className={"bg-purple-700"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable27" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"next backdrop"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable28" style={{borderRadius:"5px"}}  className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"change size by"}<TextArea place={10}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable29" style={{borderRadius:"5px"}} style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"set size to"}<TextArea place={100}/>{"%"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable30"  style={{borderRadius:"5px"}}  className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"change"}<Select type={"looks3"} className={"bg-purple-700"}/>{"effect by"}<TextArea place={25}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable31" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"set"}<Select type={"looks3"} className={"bg-purple-700"}/>{"effect to"}<TextArea place={0}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable32" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"clear graphic effects"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable33" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"show"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable34" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"hide"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable35" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"go to"}<Select type={"looks4"} className={"bg-purple-700"}/>{"layer"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable36" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"go to"}<Select type={"looks4"} className={"bg-purple-700"}/><TextArea place={1}/>{"layers"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable37" style={{borderRadius:"5px"}} className="flex flex-col flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
        <div style={{display:'inline'}}>
          <Radio className={"bg-purple-500"} text={"costume"}/><Select type={"look"} className={"bg-purple-700"}/>
        </div>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable38" style={{borderRadius:"5px"}} className="flex flex-col flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
        <div style={{display:'inline'}}>
          <Radio className={"bg-purple-500"} text={"backdrop"}/><Select type={"look"} className={"bg-purple-700"}/>
        </div>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable39" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap text-white px-2 py-1 my-2 text-xs cursor-pointer">
        <Radio className={"bg-purple-500"} text={"size"}/>
      </div>





      <div ref={eventref} className="font-bold"> {"Events"} </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable40" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when "}<Icon name="flag" size={15} className="text-green-600 mx-2" />{"clicked"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable41" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when"}<Select type={"events"} className={"bg-yellow-500"}/>{"key pressed"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable42" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when this sprite clicked"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable43" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when backdrop switches to"}<Select className={"bg-yellow-500"} type={"looks2"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable44" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when"}<Select className={"bg-yellow-500"} type={"looks2"}/><span style={{margin:"auto 0"}}><Icon name={"greater-than"} size={10}/></span><TextArea place={10}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable45" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"when I recieve"}<Select className={"bg-yellow-500"} type={"message"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable46" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"broadcast"}<Select className={"bg-yellow-500"} type={"message"}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable47" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-400 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"broadcast"}<Select className={"bg-yellow-500"} type={"message"}/>{"and wait"}
      </div>

      <div ref={controllref} className="font-bold"> {"Control"} </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable48" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"wait"}<TextArea place={1}/>{"seconds"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable49" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"repeat"}<TextArea place={10}/>
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable50" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"forever"}
      </div>
      <div draggable onDragStart={(ev)=>onDragStart(ev,ev.target.id)} id="draggable51" style={{borderRadius:"5px"}} className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-xs cursor-pointer">
        {"if"}<TextArea/>{"then"}
      </div>


      </div>


      <MidArea dragover={(event)=>onDragOver(event)} 
      ondrop={(event)=>onDrop(event,event.target.id)} 
      class1={"droppable"}
      dragstart={(event)=>onDragStart(event)}
      />


      <div className="w-1/3 h-1/2 flex flex-col">
        <svg id="myCanvas" className="w-full h-full bg-blue-100 overflow-hidden flex flex-row rounded-lg bg-white border-2 border-gray-200 rounded-tl-xl m-1">
          <g style={{transformOrigin:"50% 50%"}} transform={dirRotation}>
            <CatSprite x1={xpos} y1={ypos} name={'catSprite'}/>
          </g>
        </svg>
        <div style={{textAlign:"center",margin:"0 auto",width:"fit-content", border:"1px solid black",borderRadius:"30px",padding:"5px"}}>
          x: {xpos}, y: {ypos}, degree: {deg}
        </div>
      </div>
    </div>
  );
  
}

