import 'package:json_annotation/json_annotation.dart';

part 'fridge_item.g.dart';

@JsonSerializable()
class FridgeItem {
  String name;
  DateTime date;

  FridgeItem({
    required this.name,
    required this.date,
  });

  factory FridgeItem.fromJson(Map<String, dynamic> json) =>
      _$FridgeItemFromJson(json);

  Map<String, dynamic> toJson() => _$FridgeItemToJson(this);
}
