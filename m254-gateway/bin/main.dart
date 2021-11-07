import 'dart:convert';
import 'dart:io';

import 'package:m254_gateway/m254_gateway.dart';

void main(List<String> arguments) {
  var file = File('fridge_items.json');
  var source = file.readAsStringSync();
  var itemList = List<Map<String, dynamic>>.from(json.decode(source));
  var fridge = Fridge(itemList);
  var fridgeServer = FridgeServer(
    ip: 'localhost',
    port: 8087,
    fridge: fridge,
  );
  readLine().listen((event) async {
    switch (event) {
      case 'exit':
        await fridgeServer.stop();
        exit(0);
      default:
    }
  });
}

Stream<String> readLine() =>
    stdin.transform(utf8.decoder).transform(const LineSplitter());

void processLine(String line) {
  print(line);
}
