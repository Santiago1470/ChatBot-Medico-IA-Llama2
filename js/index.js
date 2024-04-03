$(document).ready(function () {
    var promptsAnteriores = [];

    $("#buscar").on("click", () => {
        var promptActual = $("#inputPregunta").val();
        promptsAnteriores.push(promptActual);
        // `Primeramente habla en español para responder. Supon que tu eres un medico super especializado y vas a responder a la siguiente pregunta: ${promptActual}`
        // "context": promptsAnteriores,
        // var cuerpo = {
        //     "model": "llama2",
        //     "prompt": `Primeramente habla en español para responder. Supon que tu eres un medico super especializado y vas a responder a la siguiente pregunta: ${promptActual}`,
        //     "stream": true,
        //     "options": {
        //         "num_keep": 5,
        //         "seed": 42,
        //         "top_k": 20,
        //         "top_p": 0.9,
        //         "tfs_z": 0.5,
        //         "typical_p": 0.7,
        //         "repeat_last_n": 33,
        //         "temperature": 0.8,
        //         "repeat_penalty": 1.2,
        //         "presence_penalty": 1.5,
        //         "frequency_penalty": 1.0,
        //         "mirostat": 1,
        //         "mirostat_tau": 0.8,
        //         "mirostat_eta": 0.6,
        //         "penalize_newline": true,
        //         "numa": false,
        //         "num_ctx": 2048,
        //         "num_batch": 2,
        //         "num_gqa": 1,
        //         "num_gpu": 1,
        //         "main_gpu": 0,
        //         "low_vram": false,
        //         "f16_kv": true,
        //         "vocab_only": false,
        //         "use_mmap": true,
        //         "use_mlock": false,
        //         "rope_frequency_base": 1.1,
        //         "rope_frequency_scale": 0.8,
        //         "num_thread": 8
        //     }
        // };
        
        var cuerpo = {
            "model": "llama2",
            "prompt": "What color is the sky at different times of the day?",
            "stream": true
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:11434/api/generate",
            // contentType: "jsonp",
            data: JSON.stringify(cuerpo),
            xhrFields: {
                onprogress: function(e) {
                    var response = e.currentTarget.response;
                    var lines = response.split('\n');
                    var textoAnterior = $("#textaRespuesta").text()
                    lines.forEach(function(line) {
                        if (line.trim() !== '') {
                            var responseObject = JSON.parse(line);
                            // Hacer algo con el objeto de respuesta, por ejemplo, imprimirlo
                            console.log(responseObject);
                            $("#textaRespuesta").text(`${textoAnterior}${responseObject.response}`);
                        }
                    });
                }
            },
            // success: function (data) {
            //     console.log(typeof data)
            //     // data = JSON.stringify(data)
            //     console.log(typeof data)
            //     console.log(data);
            //     $.each(data, function(index, jsonData) {
            //         // Procesar cada JSON aquí
                    
            //         console.log(jsonData);
            //     });
            //     $("#textaRespuesta").text(`${data.response}`);
            // }
        }).done(function(data){
            console.log(data)
            // $("#textaRespuesta").text(`${data.response}`);
        });
        // $.post('http://localhost:11434/api/generate', JSON.stringify(cuerpo)).done(function (respuesta) {
        //     console.log(respuesta);
        //     $("#textaRespuesta").text(`${respuesta.response}`);
        // });
    });
});

