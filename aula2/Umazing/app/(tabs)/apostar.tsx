import { Box, Text, VStack, Button, ButtonText, Input, InputField, HStack } from '@gluestack-ui/themed';

export default function ApostarScreen() {
  return (
    <Box flex={1} bg="$backgroundLight100" p="$6">
      <VStack space="lg">
        <Box bg="$white" p="$6" borderRadius="$xl" softShadow="1">
          <Text size="xl" fontWeight="$bold" mb="$4">Apostar na Corrida</Text>
          <Text color="$textLight500" mb="$2">Selecione o valor da aposta para o Cavalo "Trovão Azul":</Text>
          
          <Input variant="outline" size="md" mb="$4">
            <InputField placeholder="Valor em R$" keyboardType="numeric" />
          </Input>
          
          <Button size="lg" action="positive">
            <ButtonText>Confirmar Aposta</ButtonText>
          </Button>
        </Box>
        
        <Box bg="$info100" p="$4" borderRadius="$md">
          <HStack space="md" alignItems="center">
            <Text size="md" fontWeight="$medium" color="$info600">Saldo Atual:</Text>
            <Text size="lg" fontWeight="$bold" color="$info700">R$ 1.250,00</Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
