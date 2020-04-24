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
import std.datetime;

import apis.ntop;

@safe:

@path("/api/")
interface IRestAPI
{
  @path("/host/:ip")
  Json getIP(string _ip);
}

class RestAPI : IRestAPI
{
  override Json getIP(string _ip)
  {
    Json result = Json.emptyObject;
    result["errors"] = Json.emptyArray;

    queryNtopIP(_ip, result);

    return result;
  }
}

shared static this()
{
  Thread.getThis().name = "http";

  auto router = new URLRouter;
  router.registerRestInterface(new RestAPI);
  auto settings = new HTTPServerSettings("0.0.0.0:80");
  listenHTTP(settings, router);
}
