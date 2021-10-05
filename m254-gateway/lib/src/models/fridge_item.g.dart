// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'fridge_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FridgeItem _$FridgeItemFromJson(Map<String, dynamic> json) => FridgeItem(
      name: json['name'] as String,
      date: DateTime.parse(json['date'] as String),
    );

Map<String, dynamic> _$FridgeItemToJson(FridgeItem instance) =>
    <String, dynamic>{
      'name': instance.name,
      'date': instance.date.toIso8601String(),
    };
