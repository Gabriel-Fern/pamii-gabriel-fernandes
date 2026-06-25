import { Box, Text, VStack, Button, ButtonText, Image, HStack } from '@gluestack-ui/themed';

export default function TreinadorScreen() {
  return (
    <Box flex={1} bg="$backgroundLight100" alignItems="center" justifyContent="center">
      <VStack space="md" alignItems="center">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=256&h=256' }}
          alt="Treinador Profile"
          size="xl"
          borderRadius="$full"
        />
        <Text size="2xl" fontWeight="$bold">Treinador Gold</Text>
        <Text color="$textLight500">Nível 42 • Mestre em Corridas</Text>
        
        <HStack space="md" mt="$4">
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Treinar Cavalo</ButtonText>
          </Button>
          <Button size="md" variant="outline" action="secondary">
            <ButtonText>Ver Estábulo</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
