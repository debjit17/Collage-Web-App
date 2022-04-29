var SpeechRecognition = window.webkitSpeechRecognition;
var content;
var currentImgNum = 1;
var recognition = new SpeechRecognition();
var i = 1;                 

function myLoop() {         
  setTimeout(function() {   
    takeSelfie();
    console.log(currentImgNum)
    if(currentImgNum < 4)     
    {
        var synth = window.speechSynthesis;
        speak_data = "next selfie in 5 more seconds";
        var utter_this = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utter_this);
    }
    i++;                    
    if (i <= 3) {           
      myLoop();         
    }                       
  }, 5000)
}

function start()
{
    recognition.start();
} 

recognition.onresult = function(event)
{
    content = event.results[0][0].transcript;
    console.log(content);
    if(content == "selfie")
    {
        speak(true)
    }
    else
    {
        speak(false)
    }
}

camera = document.getElementById("camera");
Webcam.set({
    width:500,
    height:400,
    image_format : 'jpeg',
    jpeg_quality:90
});



function speak(selfie){

    
    if(selfie == true)
    {
        var synth = window.speechSynthesis;
        speak_data = "Taking selfie in 5 seconds";
        var utter_this = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utter_this);
        Webcam.attach(camera);

        myLoop();
    }
    else
    {
        var synth = window.speechSynthesis;
        speak_data = "You said " + content + ", please say only selfie to take picture";
        var utter_this = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utter_this);
    }

}

function takeSelfie()
{
    Webcam.snap(function(data_uri){
        if(currentImgNum == 1)
        {
            document.getElementById("result1").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
        }
        else if(currentImgNum == 2)
        {
            document.getElementById("result2").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
        }
        else if(currentImgNum == 3)
        {
            document.getElementById("result3").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
        } 
    });
    currentImgNum++;
}

