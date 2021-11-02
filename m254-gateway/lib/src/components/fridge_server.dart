import 'dart:async';
import 'dart:io';

import 'package:http_server/http_server.dart';
import 'package:m254_gateway/src/models/fridge.dart';

class FridgeServer {
  String ip;
  int port;
  late HttpServer server;
  late StreamSubscription _subscription;
  Fridge fridge;

  Map<String, Function> get handleRequest => {
        'GET': handleGet,
        'POST': handlePost,
        'PUT': handlePut,
        'DELETE': handleDelete,
        'OPTIONS': handleOptions,
      };

  FridgeServer({
    required this.ip,
    required this.port,
    required this.fridge,
  }) {
    _init();
  }

  Future<void> _init() async {
    server = await HttpServer.bind(ip, port);
    _subscription = server
        .transform(HttpBodyHandler())
        .listen((HttpRequestBody requestBody) async {
      await onData(requestBody);
    });
    print('Server listening at http://$ip:$port');
  }

  Future<void> stop() async {
    await _subscription.cancel();
    await server.close();
  }

  Future<void> onData(HttpRequestBody requestBody) async {
    requestBody.request.response.headers.set('Cache-Control', 'no-cache');
    requestBody.request.response.headers
        .set('Access-Control-Allow-Credentials', 'true');
    requestBody.request.response.headers
        .set('Access-Control-Allow-Origin', '*');
    requestBody.request.response.headers
        .set('Access-Control-Allow-Methods', '*');
    requestBody.request.response.headers
        .set('Access-Control-Allow-Headers', '*');
    requestBody.request.response.headers
        .set('Access-Control-Expose-Headers', HttpHeaders.authorizationHeader);

    try {
      await handleRequest[requestBody.request.method]!(requestBody);
    } catch (_) {
      requestBody.request.response
        ..statusCode = HttpStatus.methodNotAllowed
        ..write('resource not found');
      await requestBody.request.response.close();
    }
  }

  Future<void> handleGet(HttpRequestBody requestBody) async {
    var result = await fridge.getAll();
    requestBody.request.response
      ..statusCode = HttpStatus.ok
      ..write(result);
    await requestBody.request.response.close();
  }

  Future<void> handlePost(HttpRequestBody requestBody) async {
    await fridge.add(requestBody.body);
    requestBody.request.response.statusCode = HttpStatus.ok;
    await requestBody.request.response.close();
  }

  Future<void> handlePut(HttpRequestBody requestBody) async {
    await fridge.update(requestBody.body);
    requestBody.request.response.statusCode = HttpStatus.ok;
    await requestBody.request.response.close();
  }

  Future<void> handleDelete(HttpRequestBody requestBody) async {
    await fridge.delete(requestBody.body);
    requestBody.request.response.statusCode = HttpStatus.ok;
    await requestBody.request.response.close();
  }

  Future<void> handleOptions(HttpRequestBody requestBody) async {
    requestBody.request.response
      ..statusCode = HttpStatus.ok
      ..write('jaja');
    await requestBody.request.response.close();
  }
}
