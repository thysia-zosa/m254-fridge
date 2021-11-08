import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:http_server/http_server.dart';
import 'package:cron/cron.dart';

class CamundaServer {
  String ip;
  int port;
  late HttpServer server;
  late StreamSubscription _subscription;

  Map<String, Function> get handleRequest => {
        'GET': handleGet,
        'POST': handleChange,
        'PUT': handleChange,
        'DELETE': handleChange,
        'OPTIONS': handleOptions,
      };

  CamundaServer({
    required this.ip,
    required this.port,
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
    final cron = Cron();
    cron.schedule(Schedule.parse('25 6 * * *'), () async {
      await start();
    });
    cron.schedule(Schedule.parse('55 7 * * 6'), () async {
      await start();
    });
  }

  Future<void> stop() async {
    await _subscription.cancel();
    await server.close();
    print('Server shut down');
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
        ..statusCode = HttpStatus.badRequest
        ..write('resource not found');
      await requestBody.request.response.close();
    }
  }

  Future<void> handleGet(HttpRequestBody requestBody) async {
    var id = await start();
    await sendMessage('get');

    var responseBody = await getVariables(id);

    var result = responseBody['fridge_items'];

    requestBody.request.response
      ..statusCode = HttpStatus.ok
      ..write(result);
    await requestBody.request.response.close();
    await completeTask();
  }

  Future<void> handleChange(HttpRequestBody requestBody) async {
    await start();
    var variables = {
      'method': requestBody.request.method,
      'body': requestBody.body
    };
    if (requestBody.request.method == 'DELETE') {
      variables['id'] = requestBody.request.uri.pathSegments.last;
    }
    await sendMessage('change', variables);
    requestBody.request.response.statusCode = HttpStatus.created;
    await requestBody.request.response.close();
  }

  Future<void> handleOptions(HttpRequestBody requestBody) async {
    requestBody.request.response
      ..statusCode = HttpStatus.ok
      ..write('jaja');
    await requestBody.request.response.close();
  }

  Future<int> start() async {
    var response = await http.post(
      Uri.parse(
          'localhost:8080/engine-rest/process-definition/kuehlschrank/start'),
      headers: {'Content-Type': 'application/json'},
      body: '{}',
    );

    if (response.statusCode < 200 || response.statusCode > 299) {
      throw Error();
    }
    var responseBody = json.decode(response.body);

    return responseBody['id'];
  }

  Future<int> sendMessage(String message,
      [Map<String, dynamic>? variables]) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(
      'POST',
      Uri.parse('localhost:8080/engine-rest/message'),
    );
    var body = {
      'messageName': message,
      'tenantId': 7,
    };
    if (variables != null) {
      body['processVariables'] = variables;
    }
    request.body = json.encode(body);
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();

    if (response.statusCode < 200 || response.statusCode > 299) {
      throw Error();
    }

    return response.statusCode;
  }

  Future<dynamic> getVariables(int id) async {
    var response = await http.get(
      Uri.parse('localhost:8080/engine-rest/process-instance/$id/variables'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode < 200 || response.statusCode > 299) {
      throw Error();
    }
    var responseBody = json.decode(response.body);
    return responseBody;
  }

  Future<dynamic> completeTask() async {
    var response = await http.get(
      Uri.parse('localhost:8080/engine-rest/task'),
      headers: {'Content-Type': 'application/json'},
    );
    var responseBody =
        List<Map<String, dynamic>>.from(json.decode(response.body));
    var id = responseBody.first['id'];
    response = await http.post(
      Uri.parse('localhost:8080/engine-rest/task/$id/complete'),
      headers: {'Content-Type': 'application/json'},
      body: {},
    );
  }
}
