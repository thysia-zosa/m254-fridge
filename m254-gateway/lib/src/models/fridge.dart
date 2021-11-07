import 'package:m254_gateway/m254_gateway.dart';

class Fridge {
  final List<FridgeItem> _list = [];

  Fridge._internal(List<Map<String, dynamic>> itemList) {
    for (var element in itemList) {
      _list.add(FridgeItem.fromJson(element));
    }
  }

  static Fridge? _instance;

  factory Fridge(List<Map<String, dynamic>> itemList) =>
      _instance ??= Fridge._internal(itemList);

  Future<void> add(Map<String, dynamic> newItem) async {
    _list.add(FridgeItem.fromJson(newItem));
  }

  Future<List<Map<String, dynamic>>> getAll() {
    var response = <Map<String, dynamic>>[];
    for (var element in _list) {
      response.add(element.toJson());
    }
    return Future.value(response);
  }

  Future<void> update(Map<String, dynamic> itemToUpdate) async {
    var updatedItem = FridgeItem.fromJson(itemToUpdate);
    _list.removeWhere((element) => element.id == updatedItem.id);
    _list.add(updatedItem);
  }

  Future<void> delete(String id) async {
    _list.removeWhere((element) => element.id == id);
  }
}
