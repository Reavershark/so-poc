module apis.ntop;

//import std.exception;
import std.datetime : SysTime;

import vibe.data.json;
import vibe.web.rest;

@safe:

@path("/lua/rest/")
interface INtopAPI
{
  // GET /lua/rest/get/host/data.lua?host=x.x.x.x
  // Returns Json on success, html on error (host not found)
  @path("get/host/data.lua")
  Json getHostData(string host);
}

auto getNtopApi()
{
  return new RestInterfaceClient!INtopAPI("http://ntop-proxy/");
}

void queryNtopIP(string ip, ref Json result)
{
  Json response;
  try
    response = getNtopApi().getHostData(ip);
  catch (Exception e)
  {
    result["errors"] ~= "Host never seen by ntopng";
    return;
  }

  if ("seen.first" in response)
    result["firstSeen"] = SysTime.fromUnixTime(response["seen.first"].get!long).toSimpleString();
  if ("seen.last" in response)
    result["lastSeen"] = SysTime.fromUnixTime(response["seen.last"].get!long).toSimpleString();
  if ("local_network_name" in response)
    result["network"] = response["local_network_name"].get!string;
}
