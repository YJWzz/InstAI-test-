import React, { useState } from "react";
import "./TXT.css";
import Dice from "../Button/Dice";
import Revolve from "../Button/Revolve";
import Generate from "../Button/Generate";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import CheckPoint from "../DropBox/CheckPoint";
import SamplingMethod from "../DropBox/SamplingMethod";
import Styles from "../DropBox/Styles";
import NegativePrompt from "../Prompt/NegativePrompt";
import Prompt from "../Prompt/Prompt";
import Seed from "../Slider/Seed";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import SamplingStep from "../Slider/SamplingStep";
import Width from "../Slider/Width";
import { NavLink } from "react-router-dom";
import Height from "../Slider/Height";
import axios from "axios";
import Hires from "../CheckBox/Hires";
import Upscaler from "../ForHireFix/Upscaler";
import DenoisingStrength from "../ForHireFix/DenoisingStength";
import UpscaleBy from "../ForHireFix/UpscaleBy";
import HireSteps from "../ForHireFix/HireSteps";
import ResizeHeight from "../ForHireFix/ResizeHeight";
import ResizeWidth from "../ForHireFix/ResizeWidth";

/*1*/
function TxtPage() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isHiresChecked, setIsHiresChecked] = useState(false);
  const [formData, setFormData] = useState({
    enable_hr: false,
    denoising_strength: 0,
    hr_scale: 2,
    hr_upscaler: "Latent",
    hr_second_pass_steps: 0,
    hr_resize_x: 0,
    hr_resize_y: 0,
    prompt: "A cat",
    styles: [],
    seed: -1,
    batch_size: 1,
    n_iter: 1,
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: false,
    tiling: false,
    negative_prompt: "",
    eta: 0,
    override_settings: { 
      sd_model_checkpoint: "sd-v1-5-inpainting.ckpt [c6bbc15e32]" 
    },
    script_args: [],
    sampler_index: "Euler a",
    alwayson_scripts: {}
  });
 /*2*/ 
   function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
   const handleHiresCheckboxChange = (value) => {
    setIsHiresChecked(value);
  };
 /*3*/
  
  const handleFormDataChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  
    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
  };
 /*4*/
  const HandleGenerateClick = () => {
    const confirmed = window.confirm("確定要提交嗎？");
    if (confirmed) {
      const TxtToImgData = {
        method: "POST",
        request: Object.keys(formData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = formData[key];
          return acc;
        }, {}),
        response: {
          message: "請求成功",  
        },
      };
      Jsonfunction(TxtToImgData);
    }
  };
/*5*/
  async function Jsonfunction(TxtToImgData) {
    try {
      await axios.post("http://localhost:8080/api/txt2img/process", TxtToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
 /*6*/


  return (
    <div className="TXTcontanier">
      
      <div className="txt2img-title-grid">
        <div className="txt2img-InstAI-Icon" >
          <img src="/img/instai_icon.png" alt="instai" style={{height:100}}/>
        </div>

          {/* each components nested in it's own div section */}
        <div className="txt2img-section1">
          <div className="NavStyle">
            <span>
              <NavLink to="/IMGtoIMG">
                  <button>ImgPage</button>
               </NavLink>
            </span>
            <span>
              <NavLink to="/Decode">
                <button>SD PRODUCT</button>
              </NavLink>
            </span>
          </div>
        </div>

      </div>

      {/* elements nested in div className="grid"  */}
      <div className="txt2img-first-grid">

        <div className="grid-line"></div>

        <div className="txt2img-section2">
            <div>
                <CheckPoint value={formData.override_settings.sd_model_checkpoint} onChange={(value) => handleFormDataChange("override_settings.sd_model_checkpoint", value)}  />
            </div>
        </div>

      </div>
   
      <div className="txt2img-second-grid">

        <div className="txt2img-section3">
          <div className="PromptStyle">
            <div>
             <Prompt value={formData.prompt} onChange={(value) => handleFormDataChange("prompt",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section4">
          <Generate onClick={HandleGenerateClick}/>
        </div>

        <div className="txt2img-section5">
          <div className="PromptStyle">
            <div>
              <NegativePrompt value={formData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section6">
          <div className="CheckBoxStyle">
            <Styles value={formData.styles} onChange={(value) => handleFormDataChange("styles", value)} />
          </div>
        </div>

      </div>  

      <div className="txt2img-third-grid">

        <div className="txt2img-section7">
          <div className="DropBoxStyle" >
            <SamplingMethod value={formData.sampler_index} onChange={(value) => handleFormDataChange("sampler_index", value)} />
          </div>
        </div>
     
        <div className="txt2img-section8">
           <div className="SliderStyle">
            <SamplingStep value={formData.steps} onChange={(value) => handleFormDataChange("steps",value)} />
            </div>
        </div>
      </div>


      <div className="txt2img-fourth-grid">
        
        <div className="txt2img-section9">
          <div className="CheckBoxStyle"> 
            <RestoreFaces value={formData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces",value)}/>
          </div> 
        </div>

        <div className="txt2img-section10">
          <div className="CheckBoxStyle">
            <Tilling value={formData.tiling} onChange={(value) => handleFormDataChange("tiling",value)} />
          </div>
        </div>

        <div className="txt2img-section11">
          <div className="CheckBoxStyle">
          <div>
        <Hires
          value={formData.enable_hr}
          onChange={(value) => {
         handleFormDataChange("enable_hr", value);
         handleHiresCheckboxChange(value); // 設置 isHiresChecked 的值
         }}
        />
      {isHiresChecked ? (
         <div>
         {/* 顯示子元件 */}
         <Upscaler
           value={formData.hr_upscaler}
           onChange={(value) => handleFormDataChange("hr_upscaler", value)}
         />
        <DenoisingStrength
           value={formData.denoising_strength}
           onChange={(value) => handleFormDataChange("denoising_strength", value)}
         />
        <UpscaleBy
           value={formData.hr_scale}
           onChange={(value) => handleFormDataChange("hr_scale", value)}
         />
        <HireSteps
           value={formData.hr_second_pass_steps}
           onChange={(value) => handleFormDataChange("hr_second_pass_steps", value)}
         />
        <ResizeHeight
           value={formData.hr_resize_x}
           onChange={(value) => handleFormDataChange("hr_resize_x", value)}
        />
        <ResizeWidth
           value={formData.hr_resize_y}
           onChange={(value) => handleFormDataChange("hr_resize_y", value)}
        />
       </div>
       ) : null}
        </div>
           </div>
        </div>

      </div>

      <div className="txt2img-fifth-grid">

        <div className="txt2img-section12">
          <div className="SliderStyle">
            <div>
              <Width value={formData.width} onChange={(value) => handleFormDataChange("width",value)} />
            </div>
          </div>
        </div>

        <div className="txt2img-section13">
          <div className="SliderStyle">
            <div>
              <BatchCount value={formData.n_iter} onChange={(value) => handleFormDataChange("n_iter", value)} />
             </div>
          </div>
        </div>


        <div className="txt2img-section14">
          <div className="SliderStyle">
            <div>
              <Height value={formData.height} onChange={(value) => handleFormDataChange("height",value)}/>
            </div>
          </div>
        </div>

        <div className="txt2img-section15">
          <div className="SliderStyle">
            <div>
             <BatchSize value={formData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
             </div>
          </div>
        </div>
      </div>
     
      <div className="txt2img-sixth-grid">
          <div className="txt2img-section16">
            <div className="SliderStyle">
              <div>
                <CFGScale value={formData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale",value)} />
              </div>
            </div>
          </div>
      </div>

      <div className="txt2img-seventh-grid">
        <div className="txt2img-section17">
        <div className="SliderStyle">
          <Seed value={formData.seed} onChange={(value)=>handleFormDataChange("seed",value) }/>
         </div>
        </div>

        <div className="txt2img-section18">
          <div>
            <Dice />
          </div>
        </div>

        <div className="txt2img-section19">
          <div>
            <Revolve />
          </div>
        </div>

      </div>
     
    </div>
  );
}

export default TxtPage;

