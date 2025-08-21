from rest_framework import serializers

# created the models for the stock prediction API
class StockPredictionSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=20)