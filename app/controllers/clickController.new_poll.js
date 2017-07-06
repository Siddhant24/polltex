document.querySelector("#new").addEventListener('click', function(){
				var options = document.querySelector(".options");
				var option_num = (parseInt(options.lastElementChild.getAttribute("name").slice(6))+1).toString();
				var label = document.createElement('label');
				var input = document.createElement('input');
				input.setAttribute("type", "text");
				input.setAttribute("name", `option${option_num}`);
				label.innerHTML = "Option " + option_num + ":&nbsp;";
				options.append(document.createElement('br'));
				options.append(label);
				options.append(input);
			});