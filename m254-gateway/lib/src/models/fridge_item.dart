import 'package:json_annotation/json_annotation.dart';

part 'fridge_item.g.dart';

@JsonSerializable()
class FridgeItem {
  String id;
  String type;
  String expirationDate;
  String description;

  FridgeItem({
    required this.id,
    required this.type,
    required this.expirationDate,
    required this.description,
  });

  factory FridgeItem.fromJson(Map<String, dynamic> json) =>
      _$FridgeItemFromJson(json);

  Map<String, dynamic> toJson() => _$FridgeItemToJson(this);
}
