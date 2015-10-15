/*
 * Video plugin template
 * This template can serve as an example of a Video Technology Plugin
 * version: 0.1
 */

(function(_, $) {
  /**
   * @class TemplateVideoFactory
   * @classdesc Factory for creating video player objects that use HTML5 video tags.
   * @property {string} name The name of the plugin
   * @property {boolean} ready The readiness of the plugin for use.  True if elements can be created.
   * @property {object} streams An array of supported encoding types (ex. m3u8, mp4)
   */
  var TemplateVideoFactory = function() {
    this.name = "templateVideoTech";
    this.streams = ["m3u8", "mp4"];

    // This module defaults to ready because no setup or external loading is required
    this.ready = true;

    /**
     * Creates a video player instance using TemplateVideoWrapper.
     * @public
     * @method TemplateVideoFactory#create
     * @param {object} parentContainer The jquery div that should act as the parent for the video element
     * @param {string} stream The url of the stream to play
     * @param {string} id The id of the video player instance to create
     * @param {object} ooyalaVideoController A reference to the video controller in the Ooyala player
     * @param {object} css The css to apply to the video element
     * @returns {object} A reference to the wrapper for the newly created element
     */
    this.create = function(parentContainer, stream, id, ooyalaVideoController, css) {
      var element = {};
      var wrapper = new TemplateVideoWrapper(id, element);
      wrapper.controller = ooyalaVideoController;
      wrapper.subscribeAllEvents();
      return wrapper;
    };

    /**
     * Destroys the video technology factory.
     * @public
     * @method TemplateVideoFactory#destroy
     */
    this.destroy = function() {
      this.ready = false;
      this.streams = [];
      this.create = function() {};
    };
  };

  /**
   * @class TemplateVideoWrapper
   * @classdesc Player object that wraps the video element.
   * @param {string} playerId The id of the video player element
   * @param {object} video The core video object to wrap
   * @property {object} streams A list of the stream supported by this video element
   * @property {object} controller A reference to the Ooyala Video Tech Controller
   * @property {boolean} canSeek When false, the plugin should supress or undo seeks that come from native
   *                             video controls
   */
  var TemplateVideoWrapper = function(playerId, video) {
    var _video = video;
    var listeners = {};

    this.controller = {};
    this.streams = [];
    this.canSeek = true;

    /************************************************************************************/
    // Required. Methods that Video Controller, Destroy, or Factory call
    /************************************************************************************/

    /**
     * Subscribes to all events raised by the video element.
     * This is called by the Factory during creation.
     * @public
     * @method TemplateVideoWrapper#subscribeAllEvents
     */
    this.subscribeAllEvents = function() {
      listeners = { "play": _.bind(raisePlayEvent, this),
                    "playing": _.bind(raisePlayingEvent, this),
                    "ended": _.bind(raiseEndedEvent, this),
                    "error": _.bind(raiseErrorEvent, this),
                    "seeking": _.bind(raiseSeekingEvent, this),
                    "seeked": _.bind(raiseSeekedEvent, this),
                    "pause": _.bind(raisePauseEvent, this),
                    "ratechange": _.bind(raiseRatechangeEvent, this),
                    "stalled": _.bind(raiseStalledEvent, this),
                    "volumechange": _.bind(raiseVolumeEvent, this),
                    "volumechangeNew": _.bind(raiseVolumeEvent, this),
                    "waiting": _.bind(raiseWaitingEvent, this),
                    "timeupdate": _.bind(raiseTimeUpdate, this),
                    "durationchange": _.bind(raiseDurationChange, this),
                    "progress": _.bind(raiseProgress, this),
                    "canplaythrough": _.bind(raiseCanPlayThrough, this),
                    "webkitbeginfullscreen": _.bind(raiseFullScreenBegin, this),
                    "webkitendfullscreen": _.bind(raiseFullScreenEnd, this)
                  };
      _.each(listeners, function(v, i) { $(_video).on(i, v); }, this);
    };

    /**
     * Unsubscribes all events from the video element.
     * This should be called by the destroy function.
     * @public
     * @method TemplateVideoWrapper#unsubscribeAllEvents
     */
    this.unsubscribeAllEvents = function() {
      _.each(listeners, function(v, i) { $(_video).off(i, v); }, this);
    };

    /**
     * Sets the url of the video.
     * @public
     * @method TemplateVideoWrapper#setVideoUrl
     * @param {string} url The new url to insert into the video element's src attribute
     * @returns {boolean} True or false indicating success
     */
    this.setVideoUrl = function(url) {
      return true;
    };

    /**
     * Loads the current stream url in the video element; the element should be left paused.
     * @public
     * @method TemplateVideoWrapper#load
     * @param {boolean} rewind True if the stream should be set to time 0
     */
    this.load = function(rewind) {
    };

    /**
     * Triggers playback on the video element.
     * @public
     * @method TemplateVideoWrapper#play
     */
    this.play = function() {
    };

    /**
     * Triggers a pause on the video element.
     * @public
     * @method TemplateVideoWrapper#pause
     */
    this.pause = function() {
    };

    /**
     * Triggers a seek on the video element.
     * @public
     * @method TemplateVideoWrapper#seek
     * @param {number} time The time to seek the video to (in seconds)
     */
    this.seek = function(time) {
    };

    /**
     * Triggers a volume change on the video element.
     * @public
     * @method TemplateVideoWrapper#setVolume
     * @param {number} volume A number between 0 and 1 indicating the desired volume percentage
     */
    this.setVolume = function(volume) {
    };

    /**
     * Applies the given css to the video element.
     * @public
     * @method OoyalaVideoWrapper#applyCss
     * @param {object} css The css to apply in key value pairs
     */
    this.applyCss = function(css) {
    };

    /**
     * Destroys the individual video element.
     * @public
     * @method TemplateVideoWrapper#destroy
     */
    this.destroy = function() {
      // Pause the video
      // Reset the source
      // Unsubscribe all events
      this.unsubscribeAllEvents();
      // Remove the element
    };


    // **********************************************************************************/
    // Example callback methods
    // **********************************************************************************/

    var raisePlayEvent = function(event) {
      this.controller.notify(this.controller.EVENTS.PLAY, { url: event.target.src });
    };

    var raisePlayingEvent = function() {
      this.controller.notify(this.controller.EVENTS.PLAYING);
    };

    var raiseEndedEvent = function() {
      this.controller.notify(this.controller.EVENTS.ENDED);
    };

    var raiseErrorEvent = function(event) {
      var code = event.target.error ? event.target.error.code : -1;
      this.controller.notify(this.controller.EVENTS.ERROR, { "errorcode" : code });
    };

    var raiseSeekingEvent = function() {
      this.controller.notify(this.controller.EVENTS.SEEKING);
    };

    var raiseSeekedEvent = function() {
      this.controller.notify(this.controller.EVENTS.SEEKED);
    };

    var raisePauseEvent = function() {
      this.controller.notify(this.controller.EVENTS.PAUSED);
    };

    var raiseRatechangeEvent = function() {
      this.controller.notify(this.controller.EVENTS.RATE_CHANGE);
    };

    var raiseStalledEvent = function() {
      this.controller.notify(this.controller.EVENTS.STALLED);
    };

    var raiseVolumeEvent = function(event) {
      this.controller.notify(this.controller.EVENTS.VOLUME_CHANGE, { "volume" : event.target.volume });
    };

    var raiseWaitingEvent = function() {
      this.controller.notify(this.controller.EVENTS.WAITING);
    };

    var raiseTimeUpdate = function(event) {
      raisePlayhead(this.controller.EVENTS.TIME_UPDATE, event);
    };

    var raiseDurationChange = function(event) {
      raisePlayhead(this.controller.EVENTS.DURATION_CHANGE, event);
    };

    var raisePlayhead = _.bind(function(eventname, event) {
      this.controller.notify(eventname,
                             { "currentTime" : event.target.currentTime,
                               "duration" : event.target.duration,
                               "buffer" : 10,
                               "seekRange" : { "begin" : 0, "end" : 10 } });
    }, this);

    var raiseProgress = function(event) {
      this.controller.notify(this.controller.EVENTS.PROGRESS,
                             { "currentTime": event.target.currentTime,
                               "duration": event.target.duration,
                               "buffer": 10,
                               "seekRange": { "begin": 0, "end": 10 } });
    };

    var raiseCanPlayThrough = function() {
      this.controller.notify(this.controller.EVENTS.BUFFERED);
    };

    var raiseFullScreenBegin = function(event) {
      this.controller.notify(this.controller.EVENTS.FULLSCREEN_CHANGED,
                             { "isFullScreen" : true, "paused" : event.target.paused });
    };

    var raiseFullScreenEnd = function(event) {
      this.controller.notify(this.controller.EVENTS.FULLSCREEN_CHANGED,
                             { "isFullScreen" : false, "paused" : event.target.paused });
    };
  };

  OO.Video.plugin(new TemplateVideoFactory());
}(OO._, OO.$));