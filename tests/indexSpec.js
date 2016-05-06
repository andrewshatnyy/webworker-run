describe('Worker', function () {
  it('takes function and creates a worker', function(done) {
    var worker = WebWorker(function(input) {
      var to = setTimeout(function() {
        clearTimeout(to);
        wrk.done(input);  
      }, 1000);
    });
    worker.run('asdjalksdasd').then(function(result) {
      expect(result).toEqual('asdjalksdasd');
      done()
    }, function() {
      console.error(arguments);
      done()
    });
  });

  it('allows for xhr', function(done) {
    var worker = WebWorker(function(url) {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function(){
        wrk.done(this.responseText);
      });
      oReq.open('GET', url);
      oReq.setRequestHeader('Content-Type', 'application/json');
      oReq.send();
    });
    worker.run('http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true').then(function(result) {
      expect(JSON.parse(result).length).toBeTruthy();
      done()
    }, function() {
      console.error(arguments);
      done()
    });
  });
});
