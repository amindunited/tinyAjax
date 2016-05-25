
var $amu = (function () {
  return {
    makeRequest: function (options) {
      
      var request = new XMLHttpRequest();

      //If there is no request object, return.
      if (!request) {
        console.warn('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }

      //Set xhrFields withCredentials
      if ( options.xhrFields && options.xhrFields.withCredentials ) {
        request.withCredentials = options.xhrFields.withCredentials;
      } else {
        request.withCredentials = false;
      }

      //Open the request
      request.open(options.method, options.url);

      //Set the content type
      if (options.contentType) {
        request.setRequestHeader('Content-Type', options.contentType);
      } else {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      }
      
      //Handle the response
      request.onreadystatechange = function (data) {

        if (request.readyState == 4 && request.status == 200) {
          options.success ? options.success.call(this, request.response) : null;
        }

      };

      //prepare the data
      if (typeof options.data === 'object') {
        options.data = JSON.stringify(options.data);  
      }

      //send the data
      request.send(options.data);

    },

    /**
     * ajax helper method
     * @param  {Object} params {} 
     *    @param {String} method - ['GET', 'POST', 'PUT', 'DELETE']
     *    @param {String} url - endpoint url
     *    @param {Object} xhrFields 
     *           @param {Boolean} withCredentials - for cross domain requests
     *    @param {Object} data - [a string or Object of key values to be passed to the server]
     *    @param {Boolean} crossDomain
     *    @param {String} contentType - the content type eg: 'application/json'
     *    @param {function} success - a method to be called on success
     
     * @return null
     */
    ajax: function (params) {
      return this.makeRequest(params);
    }
  };
})();
