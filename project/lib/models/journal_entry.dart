// lib/models/journal_entry.dart

import 'package:intl/intl.dart';

class JournalEntry {
  final String id;
  final String title;
  final String content;
  final String weather;
  final String location;
  final DateTime createdAt;

  JournalEntry({
    required this.id,
    required this.title,
    required this.content,
    required this.weather,
    required this.location,
    required this.createdAt,
  });

  factory JournalEntry.fromJson(Map<String, dynamic> json) {
    return JournalEntry(
      id: json['_id'] as String,
      title: json['title'] as String,
      content: json['content'] as String,
      weather: json['weather'] as String,
      location: json['location'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  String get formattedDate {
    return DateFormat('MMM d, yyyy - hh:mm a').format(createdAt);
  }
}
