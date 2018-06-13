
var fs = require('fs');

const dotenv = require( 'dotenv');
dotenv.config()

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');


var speech_to_text = new SpeechToTextV1 ({
			username: process.env.STT_USERNAME,
			password: process.env.STT_PASSWORD,
});

var files = ['test.mp3'];
for (var file in files) {
  var params = {
    audio: fs.createReadStream(files[file]),
    content_type: 'audio/mp3',
    timestamps: true,
  };

  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      console.log('Error:', error);
    else
    {
     var sttResult = JSON.stringify(transcript, null, 2);
     
    	console.log('**** STT Output START ****');
      	console.log(sttResult);
    	console.log('**** STT Output END ****\n');

    	console.log('**** STT Transcript START ****');      
      	console.log(transcript.results[0].alternatives[0].transcript);
      	console.log('**** STT Transcript END ****\n');      
      
      //process.exit(0);
      
		var languageTranslator = new LanguageTranslatorV2({
			username: process.env.TR_USERNAME,
			password: process.env.TR_PASSWORD,
			version: 'v2'
		});

		var parameters = {
		  text: transcript.results[0].alternatives[0].transcript,
		  model_id: 'en-de'
		};



		languageTranslator.translate(
		  parameters,
		  function(error, response) {
			if (error)
			  console.log(error)
			else
			{
				// console.log(JSON.stringify(response, null, 2));
				 //var jsonContent = JSON.parse(response,null,2 );
				// Get Value from JSON
				var jsonTranslate = response.translations[0];
				
				console.log('**** STT Translation START ****');      
      			console.log(jsonTranslate.translation);
		     	console.log('**** STT Translation END ****\n'); 
	
		
				var natural_language_understanding = new NaturalLanguageUnderstandingV1({
						username: process.env.NLU_USERNAME,
						password: process.env.NLU_PASSWORD,
				  		'version_date': '2017-02-27'
				});

				var parameters = {
				  'text': transcript.results[0].alternatives[0].transcript, // jsonTranslate.translation,
				  'features': {
					'entities': {
					  'emotion': true,
					  'sentiment': true,
					  'limit': 5
					},
					'keywords': {
					  'emotion': true,
					  'sentiment': true,
					  'limit': 5
					}
				  }
				}



				natural_language_understanding.analyze(parameters, function(err, response) {
				  if (err)
					console.log('error:', err);
				  else
					console.log(JSON.stringify(response, null, 2));
				});



	
			}
		  }
		);

 
      
    }
  });
}




