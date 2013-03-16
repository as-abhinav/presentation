var APP = {};

APP.localCache = (function(){
	var storage = window.localStorage;
	return {
		set: function(key,data){
			storage.setItem(key, JSON.stringify(data));
		},
		get: function(key){
			var tmpStorage = storage.getItem(key);
			return (tmpStorage != null) ? JSON.parse(tmpStorage) : [];
		}
	};

})();