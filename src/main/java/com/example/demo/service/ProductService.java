package com.example.demo.service;

import com.example.demo.dto.ProductRequestDto;
import com.example.demo.dto.ProductResponseDto;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductResponseDto createProduct(ProductRequestDto dto) {
        Product product = ProductMapper.toEntity(dto);
        return ProductMapper.toResponseDto(productRepository.save(product));
    }

    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toResponseDto)
                .toList();
    }

    public ProductResponseDto getProductById(Long id) {
        Product product = findProductOrThrow(id);
        return ProductMapper.toResponseDto(product);
    }

    public ProductResponseDto updateProduct(Long id, ProductRequestDto dto) {
        Product existing = findProductOrThrow(id);
        ProductMapper.updateEntity(existing, dto);
        return ProductMapper.toResponseDto(productRepository.save(existing));
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    private Product findProductOrThrow(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}
