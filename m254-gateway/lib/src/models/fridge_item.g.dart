// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'fridge_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FridgeItem _$FridgeItemFromJson(Map<String, dynamic> json) => FridgeItem(
      id: json['id'] as String,
      type: json['type'] as String,
      expirationDate: json['expirationDate'] as String,
      description: json['description'] as String,
    );

Map<String, dynamic> _$FridgeItemToJson(FridgeItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'expirationDate': instance.expirationDate,
      'description': instance.description,
    };
