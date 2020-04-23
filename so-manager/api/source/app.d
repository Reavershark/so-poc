import vibe.appmain;
import vibe.core.core;
import vibe.core.log;
import vibe.data.json;
import vibe.http.router;
import vibe.http.server;
import vibe.http.client;
import vibe.web.rest;
import vibe.stream.operations;

import core.thread;

import std.exception;

@safe:

@path("/api/")
interface RestAPISpec
{
  @path("/host/:ip")
  string getHost(string _ip);
}

class RestAPI : RestAPISpec
{
  override string getHost(string _ip)
  {
    string result;

    requestHTTP("http://ntop-proxy/lua/rest/get/host/data.lua?host=" ~ _ip, (scope req) {
    }, (scope res) {
      enforce(res.headers["content-type"] == "application/json");
      result = res.bodyReader.readAllUTF8();
    });

    return result;
  }
}

shared static this()
{
  Thread.getThis().name = "http";

  auto router = new URLRouter;
  router.registerRestInterface(new RestAPI);
  auto settings = new HTTPServerSettings("127.0.0.1:8080");
  listenHTTP(settings, router);
}
