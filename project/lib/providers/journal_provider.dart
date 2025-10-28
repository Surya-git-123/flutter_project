// lib/providers/journal_provider.dart

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/journal_entry.dart';

// IMPORTANT: Replace with your actual backend URL and secret key
const String _backendUrl = 'http://localhost:3000/api/journals'; // Change to deployed URL later
const String _secretKey = 'YOUR_SECRET_KEY'; // Must match JWT_SECRET in backend .env

class JournalProvider with ChangeNotifier {
  List<JournalEntry> _entries = [];
  bool _isLoading = false;

  List<JournalEntry> get entries => [..._entries];
  bool get isLoading => _isLoading;

  Future<void> fetchEntries() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await http.get(
        Uri.parse(_backendUrl),
        headers: {
          'Content-Type': 'application/json',
          'x-journal-app-secret': _secretKey,
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        _entries = data.map((item) => JournalEntry.fromJson(item)).toList();
      } else {
        // Handle error
        print('Failed to load entries: ${response.statusCode}');
        _entries = [];
      }
    } catch (e) {
      print('Error fetching entries: $e');
      _entries = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> addEntry(String title, String content, String location) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await http.post(
        Uri.parse(_backendUrl),
        headers: {
          'Content-Type': 'application/json',
          'x-journal-app-secret': _secretKey,
        },
        body: json.encode({
          'title': title,
          'content': content,
          'location': location,
        }),
      );

      if (response.statusCode == 200) {
        final newEntry = JournalEntry.fromJson(json.decode(response.body));
        _entries.insert(0, newEntry); // Add to the beginning
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        print('Failed to add entry: ${response.statusCode}');
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      print('Error adding entry: $e');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
