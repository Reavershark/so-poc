module apis.misp;

import vibe.data.json;
import vibe.web.rest;
import vibe.http.common : HTTPMethod;

import std.process : environment;
import std.exception : enforce;

import std.algorithm : map, uniq;
import std.array : array;

@safe:

@path("/")
interface IMispAPI
{
  @headerParam("auth", "Authorization")
  {
    // POST /attributes/restSearch
    @path("attributes/restSearch")
    @method(HTTPMethod.POST)
    @bodyParam("value", "value")
    Json searchAttributes(string auth, string value);
  }
}

auto getMispApi()
{
  return new RestInterfaceClient!IMispAPI("http://misp-proxy/");
}

void queryMisp(string value, ref Json result)
{
  import vibe.core.log : logInfo;

  Json response;
  response = getMispApi().searchAttributes(environment["MISP_API_KEY"], value);

  Json attributes = response["response"]["Attribute"];
  enforce(attributes.type == Json.Type.array);

  if (attributes.length == 0)
  {
    result["errors"] ~= "Host not found in MISP";
    return;
  }

  result["mispMatches"] = attributes.length;
  result["mispEvents"] = attributes.get!(Json[])
    .map!(a => a["Event"]["uuid"])
    .uniq
    .array;
}
