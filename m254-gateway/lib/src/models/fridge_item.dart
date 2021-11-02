import 'package:json_annotation/json_annotation.dart';
import 'package:mongo_dart/mongo_dart.dart';

part 'fridge_item.g.dart';

@JsonSerializable()
class FridgeItem {
  ObjectId id;
  String name;
  DateTime date;
  String? metaData;

  FridgeItem({
    required this.name,
    required this.date,
    String? id,
    this.metaData,
  }) : id = id == null ? ObjectId() : ObjectId.fromHexString(id);

  factory FridgeItem.fromJson(Map<String, dynamic> json) =>
      _$FridgeItemFromJson(json);

  Map<String, dynamic> toJson() => _$FridgeItemToJson(this);
}
