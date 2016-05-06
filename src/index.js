(function() {
  'use strict';

  function WebWorker(fun) {
    var fn = "(function() {\n" +
      "\t'use strict';\n"+
      "\tvar wrk = {done:postMessage.bind(self)};\n" +
      "\tself.onmessage = (function(self) {\n"+
      "\t\treturn function onmessage(msg) {\n"+
      "\t\t\t("+fun.toString()+")(msg.data);\n"+
      "\t\t};"+
      "\t})(this);\n"+
    "})(this);";

    var blob = new window.Blob([fn]);
    var urlBlob = window.URL.createObjectURL(blob);
    var worker = new window.Worker(urlBlob);
    window.URL.revokeObjectURL(urlBlob);

    function run(args) {
      return new Promise(function(resolve, reject) {
        worker.onerror = reject;
        worker.onmessage = function(msg) {
          resolve(msg.data);
        };
        worker.postMessage(args);
      });
    }
    return { run: run };
  };
  window.WebWorker = WebWorker;
})(window);