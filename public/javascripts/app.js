var presentations = [],
	pptTemplate,
	slideTemplate,
	presentationCounter = 0,
	localStorageKey = 'ppt';

function createNewPresentation(ppt){
	createPresentation(ppt);
	savePresentation(ppt);
}

function savePresentation(ppt){
	if(ppt && !ppt.slides){
		ppt.slides = [];
	}
	presentations.push(ppt);
	APP.localCache.set(localStorageKey, presentations);
};

var createPresentation = function(){
	var pptTemplate = $("#presentationTemplate").html(),
		$presentationContainer = $('#presentationContainer');
	return function(ppt){
		var $tmpHtml = $(_.template(pptTemplate, ppt));

		$tmpHtml.attr('data-ppt-id', ppt.id);
		$presentationContainer.append($tmpHtml);
		
		$presentationContainer.find("a.icon.plus").off('click').on('click', function(){
			var pptId = $(this).closest('li.row').attr('data-ppt-id'),
				dialog = $('#addSlideDialog');
			$('#newSlide').attr('data-ppt-id', pptId);
			$('#addSlideDialog').modal();
		});

		$presentationContainer.find("a.icon.trash").off('click').on('click', function(e){
			e.preventDefault();
			var pptId = $(this).closest('li.row').attr('data-ppt-id');
			if(confirm("Do you want to delete this presentation?")){
				deletePresentation(pptId);
			}
		});

		$('#addPresentationDialog').modal('hide');
	};
};

function deletePresentation(pptId){
	// delete view
	$("#presentationContainer li.row[data-ppt-id='" + pptId + "']").slideUp(function(){
		this.remove();
	});
	//delete data
	presentations.splice(pptId, 1);
	APP.localCache.set(localStorageKey, presentations);
}

function bindCreatePptForm(){
	$("#newPresentation").on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		createNewPresentation({
			id: ""+(presentationCounter++),
			title: $form.find('#name').val(), 
			description: $form.find('#description').val()
		});
		return false;
	});
}

function bindAddSlideForm(){
	$("#newSlide").on('submit', function(e){
		e.preventDefault();
		var $form = $(this),
			pptId = $form.data('ppt-id');
		createNewSlide({
			parentId: pptId,
			content: escape($form.find('textarea').val())
		});
		return false;
	});
}

function createNewSlide(slide){
	createSlide(slide);
	saveSlide(slide);
}

function saveSlide(slide){
	$.each(presentations, function(index){
		if(this.id == slide.parentId){
			this.slides.push(slide);
			return;
		}
	});

	APP.localCache.set(localStorageKey, presentations);
}

var createSlide = function(){
	var slideTemplate = $('#slideTemplate').html();
	return function(slide){
		var $slideContainer = $('#presentationContainer').find('>li').eq(slide.parentId).find('ul.slides');
		$slideContainer.append(_.template(slideTemplate, slide));

		$('#addSlideDialog').modal('hide');
	};
}


$(function(){
	//load existing presentation
	presentations = APP.localCache.get(localStorageKey);
	presentationCounter = presentations.length;
	createPresentation = createPresentation();
	createSlide = createSlide();

	//render existing presentations on screen
	if(presentations && presentations.length){
		$.each(presentations, function(){
			createPresentation(this);
			$.each(this.slides, function(){
				createSlide(this);
			});
		})
		
	}
	
	//
	bindCreatePptForm();
	bindAddSlideForm();
	//
});